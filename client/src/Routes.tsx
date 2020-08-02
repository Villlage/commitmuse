import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import { User } from './interfaces/baseIntefaces'
import NotFound from './app/pages/public/404'
import MyIsa from './app/pages/public/company/my-isa'
import OnBoarding from './app/pages/public/company/on-boarding'
import SingleIsa from './app/pages/public/company/my-isa/single-isa'
import CreateIsa from './app/pages/public/company/my-isa/create-isa'
import SignUp from './app/pages/public/auth/sign-up'
import SignIn from './app/pages/public/auth/sign-in'
import IsaOverview from './app/pages/public/company/my-isa/isa-overview'
import ClientIsaOffer from './app/pages/public/client/isa-offer-steps/review'
import Settings from './app/pages/public/client/settings'

export default function Routes(routerProps: any) {
  return (
    <Router basename={'/web'}>
      <Switch>
        <Route path="/login" render={(props: any) => <SignIn {...props} {...routerProps} />} />
        <Route path="/register" render={(props: any) => <SignUp {...props} {...routerProps} />} />
        <Route path="/my-isa" render={(props: any) => <MyIsa {...props} {...routerProps} />} />
        <Route path="/isa/create" render={(props: any) => <CreateIsa {...props} {...routerProps} />} />
        <Route path="/isa/:id" render={(props: any) => <IsaOverview {...props} {...routerProps} />} />
        <Route path="/on-boarding" render={(props: any) => <OnBoarding {...props} {...routerProps} />} />
        <Route path="/client/isa-offer" render={(props: any) => <ClientIsaOffer {...props} {...routerProps} />} />
        <Route path="/settings" render={(props: any) => <Settings {...props} {...routerProps} />} />
        {/*404*/}
        <Redirect path="/" to={routerProps.currentUser ? '/my-isa' : '/login'} exact />
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