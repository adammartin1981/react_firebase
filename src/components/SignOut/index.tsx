import React from 'react';

import { withFirebaseCustom } from '../Firebase';
import { FirebaseComponentProps } from '../Firebase/context'

const SignOutButtonBase: React.FunctionComponent<FirebaseComponentProps> = ({ firebase }) =>
  <button type="button" onClick={firebase && firebase.doSignOut}>
    Sign Out
  </button>

export const SignOutButton = withFirebaseCustom(SignOutButtonBase);