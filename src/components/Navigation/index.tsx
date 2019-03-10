import * as React from 'react'
import {Link} from 'react-router-dom'
import 'firebase/auth'

import * as ROUTES from '../../constants/routes'
import { SignOutButton } from '../SignOut'
import { AuthUserContext } from '../Session';

interface NavigationProps {}

// Copying the tutorial, but this seems stupid.
// Why not just either pass it through - or make this a HOC? and wrap it in the withAuth???
// the withAuth feels like it's cocked
export const Navigation: React.FunctionComponent<NavigationProps> = () =>
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ?
        <NavigationAuth/> :
        <NavigationNonAuth/>
      }
    </AuthUserContext.Consumer>
  </div>

const NavigationNonAuth = () =>
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
    </ul>
  </div>

const NavigationAuth = () =>
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <SignOutButton/>
      </li>
    </ul>
  </div>