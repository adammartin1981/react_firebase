import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Navigation } from '../Navigation'
import { ROUTES } from '../../constants/routes'
import { LandingPage } from '../Landing'
import 'firebase/auth'
import { HomePage } from '../Home'
import { SignUpPage } from '../SignUp'
import { SignInPage } from '../SignIn'
import { PasswordForgetPage } from '../PasswordForget'
import { AdminPage } from '../Admin'
import { AccountPage } from '../Account'
import { withAuthenticationProvider } from '../Session'
import { AuthComponentProps } from '../Session/withAuthentication'
import { Counter } from '../Counter/counter'

interface AppProps extends AuthComponentProps {}

const AppBase: React.FunctionComponent<AppProps> = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={ROUTES.LANDING} component={LandingPage}/>
      <Route path={ROUTES.HOME} component={HomePage}/>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
      <Route path={ROUTES.COUNTER} component={Counter}/>
      <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
      <Route path={ROUTES.ADMIN} component={AdminPage}/>
    </div>
  </Router>

export const App = withAuthenticationProvider(AppBase)
