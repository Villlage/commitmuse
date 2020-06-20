import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import { User } from './interfaces/baseIntefaces'
import NotFound from './app/pages/public/404'
import MyIsa from './app/pages/public/MyISA'
import OnBoarding from './app/pages/public/OnBoarding'

export default function Routes({ currentUser, fetchUser }: any) {
  return (
    <Router>
        <Switch>
          <Route path="/my-isa" render={(props: any) => <MyIsa {...props} currentUser={currentUser} fetchUser={fetchUser} />} />
          <Route path="/on-boarding" render={(props: any) => <OnBoarding {...props} currentUser={currentUser} fetchUser={fetchUser} />} />
          {/*404*/}
          <Redirect path="/" to={'/my-isa'} exact />
          <Route path="*" render={(props: any) => <NotFound {...props} />} />
        </Switch>
    </Router>
  )
}

const privateRoute = (Component: any, user: User | null, route: string, fetchUser: () => void) => {
  return (
    <Route
      path={route}
      render={(props: any) =>
        user ? (
          <Component {...props} currentUser={user} fetchUser={fetchUser} />
        ) : (
          <Redirect to={'/welcome'} />
        )
      }
    />
  )
}