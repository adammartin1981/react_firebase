import { FormEvent } from 'react'
import * as React from 'react'
import { Firebase, withFirebaseCustom } from '../Firebase'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { ROUTES } from '../../constants/routes'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'recompose'
import { FirebaseComponentProps } from '../Firebase/withFirebase'
import { History } from 'history'

interface FormProps extends RouteComponentProps, FirebaseComponentProps {}

interface FormState {
  username?: string
  email?: string
  passwordOne?: string
  passwordTwo?: string
  error?: any
}

const INITIAL_STATE: FormState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class SignUpFormBase extends React.Component<FormProps, FormState> {
  public state: FormState

  constructor(props: FormProps) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  public onSubmit = (event: FormEvent): void => {
    const { email, passwordOne } = this.state

    if (!email || !passwordOne) {
      return this.setState({ error: 'Invalid values for submission passed'})
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(this.setUser)
      .then(this.resetAndGoHome)
      .catch((error: Error) => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  private setUser = (authUser: firebase.auth.UserCredential): Promise<any> => {
    if (!authUser.user) throw new Error('Unable to retrieve stored user')

    const { email, username } = this.state

    return this.props.firebase.user(authUser.user.uid)
      .set({
        username,
        email
      })
  }

  private resetAndGoHome = () => {
    this.setState({...INITIAL_STATE})
    this.props.history.push(ROUTES.HOME)
  }

  public onChange = (event: FormEvent) => {
    // Fix later on
    // @ts-ignore
    this.setState({[event.target.name]: event.target.value })
  }

  public render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export const SignUpForm = compose<FormProps, FormState>(
  withFirebaseCustom,
  withRouter,
)(SignUpFormBase)
