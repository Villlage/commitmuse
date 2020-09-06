import CompanyOnBoarding from '../app/pages/public/company/register'
import CompanyDashboard from '../app/pages/public/company/dashboard'
import CompanyCoaches from '../app/pages/public/company/dashboard/coaches'
import CompanyIsas from '../app/pages/public/company/dashboard/my-isas'
import CompanyCreateIsa from '../app/pages/public/company/dashboard/my-isas/create-isa'
import CompanyIsaOverview from '../app/pages/public/company/dashboard/my-isas/isa-overview'
import BillingAndSubs from '../app/pages/public/company/dashboard/billing-and-subs'
import AdminUsers from '../app/pages/admin/Users'
import AdminIsas from '../app/pages/admin/Isas'
import AdminPlaid from '../app/pages/admin/Plaid'
import MyIsa from '../app/pages/public/company/my-isa'
import CreateIsa from '../app/pages/public/company/my-isa/create-isa'
import IsaOverview from '../app/pages/public/company/my-isa/isa-overview'
import Settings from '../app/pages/public/client/settings'
import OnBoarding from '../app/pages/public/coach/on-boarding'
import Subscription from '../app/pages/public/company/subscription'
import CoachClients from 'app/pages/public/coach/CoachClients'
import ClientPayments from 'app/pages/public/client/ClientPayments'
import SignContract from 'app/pages/public/company/dashboard/my-isas/create-isa/sign-contract'

let APP_ROUTES: any = {
  admin: [
    { component: AdminUsers, path: '/admin/users' },
    { component: AdminIsas, path: '/admin/isas' },
    { component: AdminPlaid, path: '/admin/plaid' },
  ],
  company_admin: [
    { component: CompanyOnBoarding, path: '/company/register' },
    { component: CompanyDashboard, path: '/company/dashboard', defaultPage: true },
    { component: CompanyCoaches, path: '/company/coaches' },
    { component: CompanyIsas, path: '/company/isas', exact: true },
    { component: CompanyCreateIsa, path: '/company/isas/create' },
    { component: SignContract, path: '/company/isas/contract/:id' },
    { component: Subscription, path: '/company/subscription/:id' },
    { component: CompanyIsaOverview, path: '/company/isas/:id' },
    { component: BillingAndSubs, path: '/company/billing' },
  ],
  coach: [
    { component: CompanyOnBoarding, path: '/company/register' }, //temporary solution
    { component: MyIsa, path: '/coach/my-isa' },
    { component: CreateIsa, path: '/coach/isa/create' },
    { component: IsaOverview, path: '/coach/isa/:id' },
    { component: Settings, path: '/coach/settings' },
    { component: Subscription, path: '/coach/subscription/:id' },
    { component: CoachClients, path: '/coach/clients', defaultPage: true },
  ],
  student: [
    { component: OnBoarding, path: '/student/on-boarding' },
    { component: ClientPayments, path: '/student/payments', defaultPage: true },
  ],
}

// admins can access to all routes
APP_ROUTES.admin = [...APP_ROUTES.admin, ...APP_ROUTES.company_admin, ...APP_ROUTES.student]

export default APP_ROUTES
