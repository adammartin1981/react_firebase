import * as React from 'react'
import { SignUpLink } from '../SignUp'
import { SignInForm } from './signInForm'

export const SignInPage = () =>
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
