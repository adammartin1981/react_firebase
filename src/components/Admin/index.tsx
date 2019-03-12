import * as React from 'react'
import { withFirebaseCustom } from '../Firebase'
import { FirebaseComponentProps } from '../Firebase/withFirebase'

interface AdminPageProps extends FirebaseComponentProps {}

interface AdminPageState {
  loading: boolean
  users: FireBaseUser[]
}

interface User {
  email: string
  username: string
}

interface FireBaseUser extends User {
  uid: string
}

class AdminPageBase extends React.Component<AdminPageProps, AdminPageState> {

  constructor(props: AdminPageProps) {
    super(props)

    this.state = {
      loading: false,
      users: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true })

    if (!this.props.firebase) return

    this.props.firebase.users().on('value', (snapshot: firebase.database.DataSnapshot | null) => {
      if (!snapshot) return

      const userObject: Record<string, User> = snapshot.val()

      const usersList = Object.keys(userObject).map((key: string) => ({
        ...userObject[key],
        uid: key
      }))

      this.setState({
        loading: false,
        users: usersList
      })
    })
  }

  componentWillUnmount() {
    if (!this.props.firebase) return

    this.props.firebase.users().off()
  }

  render() {
    const {loading, users} = this.state

    return <div>
      <h1>Admin</h1>

      {loading && <div>Loading...</div>}

      <UserList users={users} />
    </div>
  }
}

export const AdminPage = withFirebaseCustom(AdminPageBase)

interface UserListProps {
  users: FireBaseUser[]
}

const UserList: React.FunctionComponent<UserListProps> = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);