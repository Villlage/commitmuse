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

let APP_ROUTES: any = {
  admin: [
    { component: AdminUsers, path: '/admin/users' },
    { component: AdminIsas, path: '/admin/isas' },
    { component: AdminPlaid, path: '/admin/plaid' },
  ],
  company: [
    { component: CompanyOnBoarding, path: '/company/register' },
    { component: CompanyDashboard, path: '/company/dashboard' },
    { component: CompanyCoaches, path: '/company/coaches' },
    { component: CompanyIsas, path: '/company/isas', exact: true },
    { component: CompanyCreateIsa, path: '/company/isas/create' },
    { component: CompanyIsaOverview, path: '/company/isas/:id' },
    { component: BillingAndSubs, path: '/company/billing' },
  ],
  student: [
    { component: MyIsa, path: '/my-isa' },
    { component: CreateIsa, path: '/isa/create' },
    { component: IsaOverview, path: '/isa/:id' },
    { component: Settings, path: '/settings' },
    { component: OnBoarding, path: '/on-boarding' },
    { component: Subscription, path: '/subscription/:id' },
  ],
}

// admins can access to all routes
APP_ROUTES.admin = [
  ...APP_ROUTES.admin,
  ...APP_ROUTES.company,
  ...APP_ROUTES.student,
]

export default APP_ROUTES
