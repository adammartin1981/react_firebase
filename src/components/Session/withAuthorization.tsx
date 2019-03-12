import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import { withFirebaseCustom } from '../Firebase'
import * as ROUTES from '../../constants/routes';
import { FirebaseComponentProps } from '../Firebase/withFirebase'
import { AuthUserConsumer } from './context'

export interface WithAuthorizationProps extends FirebaseComponentProps, RouteComponentProps {
  authUser: firebase.User
}

export const withAuthorization = (condition:(user: firebase.User | null) => boolean) =>
  <P extends WithAuthorizationProps>(Component: React.ComponentType<P>): React.ComponentClass<P> => {

  class WithAuthorization extends React.Component<P> {
    private listener: firebase.Unsubscribe = () => {}

    constructor(props: P) {
      super(props)
    }

    componentDidMount() {
      if (!this.props.firebase) return

      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: firebase.User | null) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN)
          }
        },
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserConsumer>
          {
            authUser => condition(authUser) ? <Component {...this.props} authUser={authUser} /> : null
          }
        </AuthUserConsumer>
      )
    }
  }

  return compose<P, P>(
    withRouter,
    withFirebaseCustom,
  )(WithAuthorization)
}
