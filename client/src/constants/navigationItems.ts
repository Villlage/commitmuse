import Settings from '../app/pages/public/client/settings'

let NAVIGATION_ITEMS: any = {
  admin: [],
  company: [
    {
      label: '',
      subItems: [
        {
          label: 'Overview',
          route: '/company/dashboard',
          icon: 'home',
          active: true,
        },
        {
          label: 'Payments',
          route: '/company/payments',
          icon: 'money-check',
          active: false,
        },
        {
          label: 'Coaches',
          route: '/company/coaches',
          icon: 'user-tie',
          active: true,
        },
        {
          label: 'Clients',
          route: '/company/clients',
          icon: 'user-graduate',
          active: false,
        },
        {
          label: 'My ISAs',
          route: '/company/isas',
          icon: 'file',
          active: true,
        },
      ],
    },
    {
      label: 'Settings',
      subItems: [
        {
          label: 'Payment’s Accounts',
          route: '/company/payment-accounts',
          icon: 'university',
          active: false,
        },
        {
          label: 'Billing And Subscription',
          route: '/company/billing',
          icon: 'credit-card',
          active: true,
        },
        {
          label: 'My Account',
          route: '/company/settings',
          icon: 'user-circle',
          active: false,
        },
      ],
    },
  ],
  coach: [
    {
      label: 'Home',
      subItems: [
        {
          label: 'Clients',
          route: '/coach/clients',
          icon: 'user-graduate',
          active: true,
        },
        {
          label: 'Payments',
          route: '/company/payments',
          icon: 'money-check',
          active: false,
        },
        {
          label: 'My ISAs',
          route: '/company/isas',
          icon: 'file',
          active: false,
        },
      ],
    },
    {
      label: 'Settings',
      subItems: [
        {
          label: 'My Account',
          route: '/company/settings',
          icon: 'user-circle',
          active: false,
        },
      ],
    },
  ],
  student: [
    {
      label: 'Home',
      subItems: [
        {
          label: 'Payments',
          route: '/company/payments',
          icon: 'money-check',
          active: false,
        },
        {
          label: 'My ISAs',
          route: '/company/isas',
          icon: 'file',
          active: false,
        },
      ],
    },
    {
      label: 'Settings',
      subItems: [
        {
          label: 'My Account',
          route: '/company/settings',
          icon: 'user-circle',
          active: false,
        },
      ],
    },
  ],
}

NAVIGATION_ITEMS.admin = [
  ...NAVIGATION_ITEMS.company,
  ...NAVIGATION_ITEMS.coach,
]

export default NAVIGATION_ITEMS