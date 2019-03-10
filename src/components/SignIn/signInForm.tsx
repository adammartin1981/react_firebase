import { withFirebaseCustom } from '../Firebase'
import * as React from 'react'
import { compose } from "recompose"
import { FormEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { FirebaseComponentProps } from '../Firebase/withFirebase'

interface SignInProps extends FirebaseComponentProps, RouteComponentProps {}

interface SignInState {
  email?: string
  password?: string
  error?: any
}

const INITIAL_STATE: SignInState = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event: FormEvent) => {
    const { email, password } = this.state

    if (!this.props.firebase) return null
    if (!email || !password) return null

    this.props.firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE})
        this.props.history.push(ROUTES.HOME)
      })
      .catch((error: Error) => {
        this.setState({error})
      })

    event.preventDefault()
  }

  onChange = (event: FormEvent) => {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { password, email, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export const SignInForm = compose<SignInProps, SignInState>(
  withRouter,
  withFirebaseCustom,
)(SignInFormBase)
