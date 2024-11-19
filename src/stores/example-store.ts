import { defineStore } from 'pinia'
import { Ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref as dbRef, set, get, child } from 'firebase/database'

export const useChatStore = defineStore('chat_store', {
  state: () => ({
    /** @type {{ email: string, name: string, userId: string }} */
    userDetails: { email: '', name: '', userId: '' },
  }),

  getters: {},

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
        } else {
          // User is logged out.
          console.log('User Logout.')
          this.userDetails.name = ''
          this.userDetails.email = ''
          this.userDetails.userId = ''
        }
      })
    },
  },
})
