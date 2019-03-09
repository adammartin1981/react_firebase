import * as React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { FormEvent } from 'react'
import { FBConsumer, Firebase } from '../Firebase'

export const SignUpPage = () =>
  <div>
    <h1>SignUp</h1>
    <FBConsumer>
      {firebase => <SignUpForm firebase={firebase}/>}
    </FBConsumer>
  </div>

interface FormProps {
  firebase: Firebase | null
}

interface FormState {
  username: string
  email: string
  passwordOne: string
  passwordTwo: string
  error: any
}

const INITIAL_STATE:FormState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class SignUpForm extends React.Component<FormProps, FormState> {

  constructor(props: FormProps) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event: FormEvent) => {

    const { username, email, passwordOne } = this.state

    if (!this.props.firebase) return null

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: firebase.auth.UserCredential) => {
        this.setState({...INITIAL_STATE})
      })
      .catch((error: Error) => {
        this.setState({ error })
      })

    event.preventDefault()

  }

  onChange = (event: FormEvent) => {
    // Fix later on
    // @ts-ignore
    this.setState({[event.target.name]: event.target.value })
  }

  render() {
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)
