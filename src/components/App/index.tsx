import * as React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import { Navigation } from '../Navigation'
import {ROUTES} from '../../constants/routes'
import {LandingPage} from '../Landing'
import {HomePage} from '../Home'

export const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
    </div>
  </Router>
