import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import AdoptionPage from '../components/AdoptionPage'


class Root extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Router>
            <Route exact path={'/'} component={LandingPage} />
            <Route path={'/adopt'} component={AdoptionPage} />
          </Router>
        </main>
      </div>

    )
  }
}

export default Root
