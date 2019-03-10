import * as React from 'react'
import { Firebase } from './firebase'

const FBContext = React.createContext<Firebase | null>(null)

export const FBProvider = FBContext.Provider
const FBConsumer = FBContext.Consumer

export interface FirebaseComponentProps {
  firebase?: Firebase
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// P goes in with Firebase
// R comes out without firebase
export const withFirebaseCustom = <P extends FirebaseComponentProps, R = Omit<P, 'firebase'>>
  (Component: React.ComponentClass<P> | React.FunctionComponent<P>): React.FunctionComponent<R> =>
  (props: R) =>
    // For the 'any'
    // https://github.com/Microsoft/TypeScript/issues/28748
    // https://github.com/Microsoft/TypeScript/pull/29437
    <FBConsumer>
      {firebase => <Component {...(props as any)} firebase={firebase} />}
    </FBConsumer>
