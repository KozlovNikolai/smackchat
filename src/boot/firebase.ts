import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyByyrrNg8rMsD2VPdQEGiARgP5qeLI4e_c',
  authDomain: 'smackchat-19c4e.firebaseapp.com',
  projectId: 'smackchat-19c4e',
  databaseURL: 'smackchat-19c4e-default-rtdb.europe-west1.firebasedatabase.app',
  messagingSenderId: '491381904656',
  appId: '1:491381904656:web:d6c0598769561034434195',
}

const fireApp = initializeApp(firebaseConfig)

const firebaseAuth = getAuth(fireApp)
const firebaseDb = getDatabase(fireApp)

export { firebaseDb, firebaseAuth }
