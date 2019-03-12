import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import { AuthUserConsumer } from './context'

export interface WithUserProps {
  authUser: firebase.User
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const withUser = <P extends WithUserProps, R = Omit<P, 'authUser'>>
(Component: React.ComponentType<P>): React.ComponentType<R> =>
  (props: R) =>
    // For the 'any'
    // https://github.com/Microsoft/TypeScript/issues/28748
    // https://github.com/Microsoft/TypeScript/pull/29437
    <AuthUserConsumer>
      {authUser => <Component {...(props as any)} authUser={authUser} />}
    </AuthUserConsumer>