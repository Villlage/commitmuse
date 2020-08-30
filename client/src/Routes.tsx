import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import NotFound from './app/pages/public/404'
import SignUp from './app/pages/public/auth/sign-up'
import SignIn from './app/pages/public/auth/sign-in'
import ClientIsaOffer from './app/pages/public/client/isa-offer-steps/review'
import PageHeader from './app/modules/common/PageHeader'
import { ScreenProps, User } from './interfaces/baseIntefaces'
import APP_ROUTES from './constants/app_routes'

export default function Routes(properties: Partial<ScreenProps>) {
  const setUserType = (user: User) => {
    if (user.user_role === 1) {
      return 'admin'
    }
    if (user.user_role === 2 && user.type === 'coaches') {
      return 'company'
    }
    return 'student'
  }

  const userType = properties.currentUser ? setUserType(properties.currentUser) : null

  const routerProps = {
    ...properties,
    currentUser: properties.currentUser
      ? {
          ...properties.currentUser,
          type: userType,
        }
      : null,
  }

  const adminRoute = (Component: any, path: string) => (
    <Route path={path}>
      {(props: any) =>
        routerProps.currentUser && routerProps.currentUser.user_role === 1 ? (
          <Component {...props} {...routerProps} />
        ) : (
          <Redirect to={'/company/dashboard'} />
        )
      }
    </Route>
  )
  const privateRoute = (Component: any, route: string, index: number, exact?: boolean) => {
    return (
      <Route
        key={index}
        exact={!!exact}
        path={route}
        render={(props: any) =>
          routerProps.currentUser ? <Component {...props} {...routerProps} /> : <Redirect to={'/login'} />
        }
      />
    )
  }

  return (
    <Router basename={'/web'}>
      <PageHeader user={routerProps.currentUser as any} setCurrentUser={routerProps.setCurrentUser as any} />
      <Switch>
        <Route path="/login" render={(props: any) => <SignIn {...props} {...routerProps} />} />
        <Route path="/register" render={(props: any) => <SignUp {...props} {...routerProps} />} />

        {/* Private Routes */}
        {routerProps.currentUser &&
          routerProps.currentUser.type &&
          APP_ROUTES[routerProps.currentUser.type].map((route: any, index: number) =>
            privateRoute(route.component, route.path, index, route.exact),
          )}

        <Route path="/client/isa-offer/:id" render={(props: any) => <ClientIsaOffer {...props} {...routerProps} />} />

        {/*404*/}
        <Redirect path="/" to={routerProps.currentUser ? '/my-isa' : '/login'} exact />
        <Route path="*" render={(props: any) => <NotFound {...props} />} />
      </Switch>
    </Router>
  )
}