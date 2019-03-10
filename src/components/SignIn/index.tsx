import * as React from 'react'
import { SignUpLink } from '../SignUp'
import { SignInForm } from './signInForm'
import { PasswordForgetLink } from '../PasswordForget'

export const SignInPage = () =>
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
