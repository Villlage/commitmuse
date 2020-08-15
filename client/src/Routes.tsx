import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import NotFound from './app/pages/public/404'
import MyIsa from './app/pages/public/company/my-isa'
import OnBoarding from './app/pages/public/coach/on-boarding'
import CreateIsa from './app/pages/public/company/my-isa/create-isa'
import SignUp from './app/pages/public/auth/sign-up'
import SignIn from './app/pages/public/auth/sign-in'
import IsaOverview from './app/pages/public/company/my-isa/isa-overview'
import ClientIsaOffer from './app/pages/public/client/isa-offer-steps/review'
import Settings from './app/pages/public/client/settings'
import AdminIsas from './app/pages/admin/Isas'
import AdminPlaid from './app/pages/admin/Plaid'
import AdminUsers from './app/pages/admin/Users'
import CompanyOnBoarding from './app/pages/public/company/register'
import Subscription from './app/pages/public/company/subscription'
import CompanyDashboard from './app/pages/public/company/dashboard'
import PageHeader from './app/modules/common/PageHeader'
import { ScreenProps } from './interfaces/baseIntefaces'
import CompanyCoaches from './app/pages/public/company/dashboard/coaches'

export default function Routes(routerProps: Partial<ScreenProps>) {
  const adminRoute = (Component: any, path: string) => (
    <Route path={path}>
      {(props: any) =>
        routerProps.currentUser && routerProps.currentUser.user_role === 1 ? <Component {...props} {...routerProps} /> : <Redirect to={'/my-isa'} />
      }
    </Route>
  )
  const privateRoute = (Component: any, route: string) => {
    return (
      <Route
        path={route}
        render={(props: any) =>
          routerProps.currentUser ? <Component {...props} {...routerProps} /> : <Redirect to={'/login'} />
        }
      />
    )
  }

  return (
    <Router basename={'/web'}>
      <PageHeader user={routerProps.currentUser} setCurrentUser={routerProps.setCurrentUser as any}  />
      <Switch>
        <Route path="/login" render={(props: any) => <SignIn {...props} {...routerProps} />} />
        <Route path="/register" render={(props: any) => <SignUp {...props} {...routerProps} />} />

        {/* Private Routes */}
        {privateRoute(MyIsa, '/my-isa')}
        {privateRoute(CreateIsa, '/isa/create')}
        {privateRoute(IsaOverview, '/isa/:id')}
        {privateRoute(Settings, '/settings')}
        {privateRoute(OnBoarding, '/on-boarding')}
        {privateRoute(Subscription, '/subscription')}
        {privateRoute(CompanyOnBoarding, '/company/register')}

        {/* Company Routes */}
        {privateRoute(CompanyDashboard, '/company/dashboard')}
        {privateRoute(CompanyCoaches, '/company/coaches')}

        {/* Admin Routes */}
        {adminRoute(AdminUsers, '/admin/users')}
        {adminRoute(AdminIsas, '/admin/isas')}
        {adminRoute(AdminPlaid, '/admin/plaid')}

        <Route path="/client/isa-offer/:id" render={(props: any) => <ClientIsaOffer {...props} {...routerProps} />} />

        {/*404*/}
        <Redirect path="/" to={routerProps.currentUser ? '/my-isa' : '/login'} exact />
        <Route path="*" render={(props: any) => <NotFound {...props} />} />
      </Switch>
    </Router>
  )
}