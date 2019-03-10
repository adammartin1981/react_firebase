import * as React from 'react'
import { PasswordChangeForm } from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'
import { withAuthorization } from '../Session'

import * as firebase from 'firebase/app'
import 'firebase/auth'

const AccountPageBase = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
)

const condition = (authUser: firebase.User | null) => !!authUser

export const AccountPage = withAuthorization(condition)(AccountPageBase)
