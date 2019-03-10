import * as React from 'react'
import { PasswordChangeForm } from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'

export const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
)
