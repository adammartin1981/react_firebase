import * as React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export { SignUpPage } from './signUpPage'

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)
