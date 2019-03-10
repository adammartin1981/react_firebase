import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export const AuthUserContext = React.createContext<firebase.User | null>(null)
