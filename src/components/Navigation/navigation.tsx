import * as React from 'react'
import {Link} from 'react-router-dom'
import 'firebase/auth'

import * as ROUTES from '../../constants/routes'
import { SignOutButton } from '../SignOut'
import { withUser, WithUserProps } from '../Session/withUser'

interface NavigationProps extends WithUserProps {}

const NavigationBase: React.FunctionComponent<NavigationProps> = ({authUser}) =>
  <div>
    {authUser ?
      <NavigationAuth/> :
      <NavigationNonAuth/>
    }
  </div>

export const Navigation = withUser(NavigationBase)

const NavigationNonAuth = () =>
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
      <li>
        <Link to={ROUTES.COUNTER}>Counter Experiment</Link>
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