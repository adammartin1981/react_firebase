import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const AuthUserContext = React.createContext<firebase.User | null>(null)

export const AuthUserProvider = AuthUserContext.Provider
export const AuthUserConsumer = AuthUserContext.Consumer
