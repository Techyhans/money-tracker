import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyDdWzox8kCm-WV2RvL1bIekw1Mt_bnyNbg',
    authDomain: 'money-tracker-db256.firebaseapp.com',
    projectId: 'money-tracker-db256',
    storageBucket: 'money-tracker-db256.appspot.com',
    messagingSenderId: '948080133112',
    appId: '1:948080133112:web:3b720ad90d15e6f38ccc0d',
    measurementId: 'G-FVWQP7L58Z',
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
