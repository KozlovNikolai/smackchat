import { UserDetails, userItem } from './../components/models'
import { defineStore } from 'pinia'
import { Ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getDatabase,
  ref as dbRef,
  set,
  get,
  child,
  update,
} from 'firebase/database'

export const useChatStore = defineStore('chat_store', {
  state: () => ({
    /** @type {{ email: string, name: string, userId: string }} */
    userDetails: { email: '', name: '', userId: '' },
    usersMap: new Map<string, UserDetails>(),
  }),

  getters: {
    userID(state) {
      return state.userDetails.userId
    },
    users(state) {
      return state.usersMap
    },
    usersArray: (state): userItem[] => {
      return Array.from(state.usersMap.entries()).map(([userId, value]) => ({
        userId,
        email: value.email, // Можно заменить на реальное значение email
        name: value.name,
        online: value.online,
      }))
    },
  },

  actions: {
    registerUser(
      payload: Ref<{ name: string; email: string; password: string }>
    ) {
      const auth = getAuth()

      createUserWithEmailAndPassword(
        auth,
        payload.value.email,
        payload.value.password
      )
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user
          console.log('user: ', user)

          // save to db
          const userId = userCredential.user.uid
          const db = getDatabase()

          const snapshot = await set(dbRef(db, 'users/' + userId), {
            name: payload.value.name,
            email: payload.value.email,
            online: true,
          })

          console.log('Register user snapshot: ', snapshot)
          this.loginUser(payload)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('errorCode: ', errorCode)
          console.log('errorMessage: ', errorMessage)
          // ..
        })
    },
    loginUser(payload: Ref<{ name: string; email: string; password: string }>) {
      const auth = getAuth()
      signInWithEmailAndPassword(
        auth,
        payload.value.email,
        payload.value.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log('Login user: ', user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('errorCode: ', errorCode)
          console.log('errorMessage: ', errorMessage)
        })
    },
    logoutUser() {
      const auth = getAuth()
      signOut(auth)
      console.log('logoutUser done.')
    },
    handleAuthStateChanged() {
      console.log('handleAuthStateChanged')
      const auth = getAuth()
      const db = getDatabase()

      onAuthStateChanged(auth, async () => {
        const userId = auth.currentUser?.uid
        const dbReference = dbRef(db)
        const snapshot = await get(child(dbReference, 'users/' + userId))
        const userFields = snapshot.val()
        if (userFields) {
          // User is logged in.
          console.log('snapshot.val(): ', userFields)
          this.userDetails.name = String(userFields.name)
          this.userDetails.email = String(userFields.email)
          this.userDetails.userId = String(userId)
          update(dbRef(db, 'users/' + userId), {
            online: true,
          })
          this.firebaseGetUsers()
          this.router.push('/')
        } else {
          // User is logged out.
          console.log('User Logout.', this.userDetails.userId)
          if (this.userDetails.userId) {
            update(dbRef(db, 'users/' + this.userDetails.userId), {
              online: false,
            })
          }
          // this.$reset
          this.userDetails.name = ''
          this.userDetails.email = ''
          this.userDetails.userId = ''
          this.router.replace('/auth')
        }
      })
    },
    firebaseGetUsers() {
      const dbReference = dbRef(getDatabase())
      get(child(dbReference, 'users'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const nodeDetails = snapshot.val()
            Object.entries(nodeDetails).forEach(([key, value]) => {
              const userDetails: UserDetails = value as UserDetails
              this.usersMap.set(key, userDetails)
            })
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error('!!!!!!!!!!!!', error)
        })
      console.log('++++Users++++:', this.usersMap)
    },
  },
})
