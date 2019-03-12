import * as React from 'react'
import { AuthUserProvider } from './context'
import { withFirebaseCustom } from '../Firebase'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { FirebaseComponentProps } from '../Firebase/withFirebase'

interface AuthState {
  authUser: firebase.User | null
}

// Commented out for when it does become a HOC
export interface AuthComponentProps extends FirebaseComponentProps {
  // authUser?: firebase.User
}

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// TODO - Look at why the F this doesn't work
// const withAuthentication = <P extends AuthComponentProps, R = Omit<P, 'authUser'>>
// (Component: React.ComponentClass<P> | React.FunctionComponent<P>): React.PureComponent<R, AuthState> => {
//   class WithAuthentication extends React.Component<P, AuthState> {
//     private listener: firebase.Unsubscribe = () => {}
//
//     // constructor(props: R) {
//     constructor(props: any) {
//
//
//       super(props as any)
//
//       this.state = {
//         authUser: null,
//       }
//     }
//
//     componentDidMount() {
//       if (this.props.firebase) {
//         this.listener = this.props.firebase.auth.onAuthStateChanged(
//           authUser => {
//             authUser
//               ? this.setState({authUser})
//               : this.setState({authUser: null})
//           },
//         )
//       }
//     }
//
//     componentWillUnmount() {
//       this.listener()
//     }
//
//     render() {
//       return (
//         <AuthUserContext.Provider value={this.state.authUser}>
//           <Component {...(this.props as any)} />
//         </AuthUserContext.Provider>
//       )
//     }
//   }
//
//   return withFirebaseCustom(WithAuthentication)
// }

// Worked out - can't type it as it's not a conventional HOC
export const withAuthenticationProvider =
  (Component: React.ComponentClass<AuthComponentProps> | React.FunctionComponent<AuthComponentProps>) => {
  class WithAuthentication extends React.Component<AuthComponentProps, AuthState> {
    private listener: firebase.Unsubscribe = () => {}

    constructor(props: AuthComponentProps) {
      super(props)

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      if (!this.props.firebase) return
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: firebase.User | null) => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null })
        },
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserProvider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserProvider>
      )
    }
  }

  return withFirebaseCustom(WithAuthentication)
}
