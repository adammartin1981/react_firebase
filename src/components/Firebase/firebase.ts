import * as app from 'firebase/app'
import 'firebase/auth'
import firebase from 'firebase'

/**
 * Create a .env file in the root of the project
 * add the keys as the following
 REACT_APP_API_KEY=xxxx(need to get this),
 REACT_APP_AUTH_DOMAIN=react-firebase-adam.firebaseapp.com
 REACT_APP_DATABASE_URL=https://react-firebase-adam.firebaseio.com
 REACT_APP_PROJECT_ID=react-firebase-adam
 REACT_APP_STORAGE_BUCKET=react-firebase-adam.appspot.com
 REACT_APP_MESSAGING_SENDER_ID=xxxxx(need to get this)
 */
const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export class Firebase {
  private auth: firebase.auth.Auth

  constructor() {
    app.initializeApp(fbConfig)

    this.auth = app.auth()
  }

  public doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  public doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password)

  public doSignOut = () =>
    this.auth.signOut()

  public doPasswordReset = (email: string) =>
    this.auth.sendPasswordResetEmail(email)

  public doPasswordUpdate = (password: string) => {
    if (!this.auth.currentUser) return null // Do error here

    return this.auth.currentUser.updatePassword(password)
  }
}