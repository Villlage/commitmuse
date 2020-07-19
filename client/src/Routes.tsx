import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import { User } from './interfaces/baseIntefaces'
import NotFound from './app/pages/public/404'
import MyIsa from './app/pages/public/coach/my-isa'
import OnBoarding from './app/pages/public/coach/on-boarding'
import SingleIsa from './app/pages/public/coach/my-isa/single-isa'

export default function Routes(routerProps: any) {
  return (
    <Router>
      <Switch>
        <Route
          path="/my-isa"
          render={(props: any) => <MyIsa {...props} {...routerProps} />}
        />
        <Route
          path="/isa/:id"
          render={(props: any) => <SingleIsa {...props} {...routerProps} />}
        />
        <Route
          path="/on-boarding"
          render={(props: any) => <OnBoarding {...props} {...routerProps} />}
        />
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
        user ? <Component {...props} currentUser={user} fetchUser={fetchUser} /> : <Redirect to={'/welcome'} />
      }
    />
  )
}