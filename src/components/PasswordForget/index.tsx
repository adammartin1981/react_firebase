import * as React from 'react'
import { FirebaseComponentProps, withFirebaseCustom } from '../Firebase/withFirebase'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export const PasswordForgetPage = () =>
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>

interface PasswordForgetState {
  email: string
  error: Error | null
}

const INITIAL_STATE: PasswordForgetState = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends React.Component<FirebaseComponentProps, PasswordForgetState> {
  constructor(props: FirebaseComponentProps) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  private onSubmit = (event: FormEvent) => {
    const { email } = this.state

    if (!this.props.firebase) return

    this.props.firebase.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch((error: Error) => {
        this.setState({error})
      })

    event.preventDefault()
  }

  private onChange = (event: FormEvent) => {
    // @ts-ignore
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const { email, error } = this.state;

    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const PasswordForgetForm = withFirebaseCustom(PasswordForgetFormBase)

export const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)
