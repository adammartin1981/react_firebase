import * as React from 'react'
import { Firebase } from './firebase'
import { Omit } from 'react-router'

const FBContext = React.createContext<Firebase | null>(null)

export const FBProvider = FBContext.Provider
export const FBConsumer = FBContext.Consumer

interface FirebaseComponentProps {
  firebase: Firebase
}

// TODO Fix better
// Look at the way to type higher order components
// Look at using a decorator for this
// https://github.com/Microsoft/TypeScript/pull/29437
// https://github.com/Microsoft/TypeScript/issues/28748
// https://stackoverflow.com/questions/53556160/react-hoc-and-typescript-3-2
export const withFirebaseCustom = <P extends FirebaseComponentProps>(Component: React.ComponentType<P>) =>
  (props: P): React.ComponentClass<Omit<P, keyof FirebaseComponentProps>> =>
    <FBConsumer>
      {firebase => <Component {...props} firebase={firebase}/>}
    </FBConsumer> as any

// Used a reference
// export function withRouter<P extends RouteComponentProps<any>>(component: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>>>;
