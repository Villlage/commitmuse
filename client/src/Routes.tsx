import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import NotFound from './app/pages/public/404'
import SignUp from './app/pages/public/auth/sign-up'
import SignIn from './app/pages/public/auth/sign-in'
import PageHeader from './app/modules/common/PageHeader'
import { ScreenProps } from './interfaces/baseIntefaces'
import APP_ROUTES from './constants/app_routes'
import NAVIGATION_ITEMS from './constants/navigationItems'
import MainNavigation from './app/modules/common/MainNavigation'
import ClientIsaOfferSigning from './app/pages/public/client/isa-offer-steps'
import CoachSignUp from './app/pages/public/auth/coach-sign-up'
import IsaOfferReview from './app/pages/public/client/isa-offer-review'
import TermsAndConditions from './app/pages/public/terms-and-conditions'

export default function Routes(routerProps: Partial<ScreenProps>) {
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
    if (!routerProps.currentUser || !routerProps.currentUser.user_type) {
      return '/my-isa'
    }

    const defaultRoute = APP_ROUTES[routerProps.currentUser.user_type].find((route: any) => route.defaultPage)

    return defaultRoute ? defaultRoute.path : '/my-isa'
  }

  return (
    <Router basename={'/web'}>
      <PageHeader user={routerProps.currentUser as any} setCurrentUser={routerProps.setCurrentUser as any} />

      {routerProps.currentUser && <MainNavigation items={NAVIGATION_ITEMS[routerProps.currentUser.user_type]} />}

      <Switch>
        {/* Auth Routes */}
        <Route path="/login" render={(props: any) => <SignIn {...props} {...routerProps} />} />
        <Route path="/register" render={(props: any) => <SignUp {...props} {...routerProps} />} />

        {/* Public Routes */}
        <Route path="/coach/invitation/:id" render={(props: any) => <CoachSignUp {...props} {...routerProps} />} />
        <Route path="/terms-and-conditions" render={(props: any) => <TermsAndConditions {...props} {...routerProps} />} />
        <Route
          path="/client/isa-offer/:id"
          render={(props: any) => <ClientIsaOfferSigning {...props} {...routerProps} />}
        />

        <Route
          path="/client/isa-offer-review/:id"
          render={(props: any) => <IsaOfferReview {...props} {...routerProps} />}
        />

        {/* Private Routes */}
        {routerProps.currentUser &&
          routerProps.currentUser.user_type &&
          APP_ROUTES[routerProps.currentUser.user_type].map((route: any, index: number) =>
            privateRoute(route.component, route.path, index, route.exact),
          )}

        {/*404*/}
        <Redirect path="/" to={routerProps.currentUser ? getDefaultPage() : '/login'} exact />
        <Route path="*" render={(props: any) => <NotFound {...props} />} />
      </Switch>
    </Router>
  )
}
