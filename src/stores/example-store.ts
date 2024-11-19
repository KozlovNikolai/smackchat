import { defineStore } from 'pinia'
import { Ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref as dbRef, set, get, child } from 'firebase/database'

export const useChatStore = defineStore('counter', {
  state: () => ({}),

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
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user
          console.log('user: ', user)

          // save to db
          const userId = userCredential.user.uid
          const db = getDatabase()

          set(dbRef(db, 'users/' + userId), {
            name: payload.value.name,
            email: payload.value.email,
            online: true,
          })
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
          console.log('user: ', user)
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

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = auth.currentUser?.uid
          const dbReference = dbRef(db)
          const snapshot = await get(child(dbReference, 'users/' + userId))
          console.log('Snapshot: ', snapshot)
        }
      })
    },
  },
})
