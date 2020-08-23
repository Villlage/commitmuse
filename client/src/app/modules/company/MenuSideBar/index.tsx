import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import Icon from '../../../components/Icon'

const menu_items = [
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
  },
  {
    label: 'My ISAs',
    route: '/company/isas',
    icon: 'file',
    active: true,
  },
  {
    label: 'Payment’s Accounts',
    route: '/company/payment-accounts',
    icon: 'university',
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
  },
]

interface MenuSideBarProps {}

export default function MenuSideBar(props: MenuSideBarProps) {
  return (
    <section className="MenuSideBar-module">
      {menu_items.map((item, i) => (
        <NavLink
          aria-disabled={!item.active}
          key={i}
          className="menu-item"
          activeClassName="is-active"
          to={item.route}
        >
          <div>
            <Icon icon={item.icon as any} />
          </div>
          <p>{item.label}</p>
        </NavLink>
      ))}
    </section>
  )
}
