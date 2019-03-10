import * as React from 'react'
import { Firebase } from './firebase'

const FBContext = React.createContext<Firebase | null>(null)

export const FBProvider = FBContext.Provider
export const FBConsumer = FBContext.Consumer

