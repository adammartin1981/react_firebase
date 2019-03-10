import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import { withFirebaseCustom } from '../Firebase'
import * as ROUTES from '../../constants/routes';
import { FirebaseComponentProps } from '../Firebase/withFirebase'

interface WithAuthorizationProps extends FirebaseComponentProps, RouteComponentProps {}

export const withAuthorization = (condition:(user: firebase.User | null) => boolean) =>
  <P extends WithAuthorizationProps>(Component: React.ComponentClass<P> | React.FunctionComponent<P>): React.ComponentClass<P> => {

  class WithAuthorization extends React.Component<P, { isLoadingUser: boolean }> {
    private listener: firebase.Unsubscribe = () => {}

    constructor(props: P) {
      super(props)
      
      this.state = {
        isLoadingUser: false
      }
    }

    componentDidMount() {
      if (!this.props.firebase) return
      if (!this.props.firebase.auth.currentUser) {
        this.setState({
          isLoadingUser: true
        })
      }

      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: firebase.User | null) => {
          this.setState({
            isLoadingUser: false
          })

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
        !this.state.isLoadingUser && <Component {...this.props} />
      )
    }
  }

  // Look at later
  return compose<P, any>(
    withRouter,
    withFirebaseCustom,
  )(WithAuthorization)
}
