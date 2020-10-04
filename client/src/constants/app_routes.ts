import CompanyOnBoarding from '../app/pages/public/company/register'
import CompanyDashboard from '../app/pages/public/company/dashboard'
import CompanyCoaches from '../app/pages/public/company/dashboard/coaches'
import CompanyIsas from '../app/pages/public/company/dashboard/my-isas'
import CreateIsa from '../app/pages/public/company/dashboard/my-isas/create-isa'
import CompanyIsaOverview from '../app/pages/public/company/dashboard/my-isas/isa-overview'
import BillingAndSubs from '../app/pages/public/company/dashboard/billing-and-subs'
import AdminUsers from '../app/pages/admin/Users'
import AdminIsas from '../app/pages/admin/Isas'
import AdminPlaid from '../app/pages/admin/Plaid'
import IsaOverview from '../app/pages/public/company/my-isa/isa-overview'
import Settings from '../app/pages/public/client/settings'
import OnBoarding from '../app/pages/public/coach/on-boarding'
import Subscription from '../app/pages/public/company/subscription'
import CoachClients from 'app/pages/public/coach/coach-clients'
import ClientPayments from 'app/pages/public/client/client-payments'
import SignContract from 'app/pages/public/company/dashboard/my-isas/create-isa/sign-contract'
import MyAccount from '../app/pages/public/company/my-account'
import CompanySingleCoach from 'app/pages/public/company/coach'
import CoachClient from 'app/pages/public/coach/coach-clients/coach-single-client'

const APP_ROUTES: any = {
  admin: [
    { component: AdminUsers, path: '/admin/users' },
    { component: AdminIsas, path: '/admin/isas' },
    { component: AdminPlaid, path: '/admin/plaid' },
  ],
  company_admin: [
    { component: CompanyOnBoarding, path: '/company/register' },
    { component: CompanyDashboard, path: '/company/dashboard', defaultPage: true },
    { component: CompanyCoaches, path: '/company/coaches', exact: true },
    { component: CompanySingleCoach, path: '/company/coaches/:coachId', exact: true },
    { component: CoachClient, path: '/company/coaches/:coachId/clients/:clientId', exact: true },
    { component: CompanyIsas, path: '/company/isas', exact: true },
    { component: CreateIsa, path: '/company/isas/create' },
    { component: SignContract, path: '/company/isas/contract/:id' },
    { component: Subscription, path: '/company/subscription/:id' },
    { component: CompanyIsaOverview, path: '/company/isas/:id' },
    { component: BillingAndSubs, path: '/company/billing' },
    { component: MyAccount, path: '/company/settings/my-account' }
  ],
  coach: [
    { component: CompanyOnBoarding, path: '/company/register' },
    { component: CoachClients, path: '/coach/clients', defaultPage: true },
    { component: CompanyIsas, path: '/coach/isas', exact: true },
    { component: SignContract, path: '/coach/isas/contract/:id' },
    { component: CreateIsa, path: '/coach/isas/create' },
    { component: IsaOverview, path: '/coach/isas/:id' },
    { component: Settings, path: '/coach/settings' },
    { component: Subscription, path: '/coach/subscription/:id' },
  ],
  student: [
    { component: OnBoarding, path: '/student/on-boarding' },
    { component: ClientPayments, path: '/student/payments', defaultPage: true },
  ],
}

// admins can access to all routes
APP_ROUTES.admin = [...APP_ROUTES.admin, ...APP_ROUTES.company_admin, ...APP_ROUTES.student]

export default APP_ROUTES
