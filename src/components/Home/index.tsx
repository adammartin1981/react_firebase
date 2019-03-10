import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import { withAuthorization } from '../Session'

export const HomePageBase = ({}) =>
  <div>
    <h1>Home</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>

const condition = (authUser: firebase.User | null) => !!authUser

export const HomePage = withAuthorization(condition)(HomePageBase)