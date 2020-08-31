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
import { NAVIGATION_ITEMS } from './constants/navigationItems'
import MainNavigation from './app/components/MainNavigation'
import { USER_TYPES } from './constants/userTypes'

export default function Routes(properties: Partial<ScreenProps>) {
  const setUserType = (user: User) => {
    if (user.user_role === 1) {
      return 'admin'
    }

    if (user.user_role === 2 && user.type === 'coaches') {
      return 'company'
    }

    if (user.type === 'coaches') {
      return 'coach'
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

  const getDefaultPage = () => {
    if (!routerProps.currentUser || !routerProps.currentUser.type) {
      return '/my-isa'
    }

    const defaultRoute = APP_ROUTES[routerProps.currentUser.type].find((route: any) => route.defaultPage)

    return defaultRoute ? defaultRoute.path : '/my-isa'
  }

  return (
    <Router basename={'/web'}>
      <PageHeader user={routerProps.currentUser as any} setCurrentUser={routerProps.setCurrentUser as any} />

      <MainNavigation items={NAVIGATION_ITEMS[userType || USER_TYPES.COACH]} />

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
        <Redirect path="/" to={routerProps.currentUser ? getDefaultPage() : '/login'} exact />
        <Route path="*" render={(props: any) => <NotFound {...props} />} />
      </Switch>
    </Router>
  )
}
