import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Navigation } from '../Navigation'
import { ROUTES } from '../../constants/routes'
import { LandingPage } from '../Landing'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { HomePage } from '../Home'
import { SignUpPage } from '../SignUp'
import { SignInPage } from '../SignIn'
import { PasswordForgetPage } from '../PasswordForget'
import { AdminPage } from '../Admin'
import { AccountPage } from '../Account'
import { FirebaseComponentProps, withFirebaseCustom } from '../Firebase/context'

interface AppProps extends FirebaseComponentProps {}

interface AppState {
  authUser: firebase.User | null
}

class AppBase extends React.Component<AppProps, AppState> {
  private listener: firebase.Unsubscribe = () => {}

  constructor(props: AppProps) {
    super(props)

    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    if (this.props.firebase) {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser =>
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      )
    }
  }

  componentWillUnmount() {
    this.listener()
  }

  render() {
    return <Router>
      <div>
        <Navigation authUser={this.state.authUser}/>

        <hr/>

        <Route exact path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
        <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
        <Route path={ROUTES.ADMIN} component={AdminPage}/>
      </div>
    </Router>
  }
}

export const App = withFirebaseCustom(AppBase)
