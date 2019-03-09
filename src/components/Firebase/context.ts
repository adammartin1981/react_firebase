import * as React from 'react'
import {Firebase} from './firebase'

export const FirebaseContext = React.createContext<Firebase | null>(null)