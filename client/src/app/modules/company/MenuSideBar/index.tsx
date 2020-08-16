import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import Icon from '../../../components/Icon'

const menu_items = [
  {
    label: 'Overview',
    route: 'dashboard',
    icon: 'home',
  },
  {
    label: 'Payments',
    route: 'payments',
    icon: 'money-check',
  },
  {
    label: 'Coaches',
    route: 'coaches',
    icon: 'user-tie',
  },
  {
    label: 'Clients',
    route: 'clients',
    icon: 'user-graduate',
  },
  {
    label: 'My ISAs',
    route: 'my-isas',
    icon: 'file',
  },
  {
    label: 'Payment’s Accounts',
    route: 'payment-accounts',
    icon: 'university',
  },
  {
    label: 'Billing And Subscription',
    route: 'billing',
    icon: 'credit-card',
  },
  {
    label: 'My Account',
    route: 'settings',
    icon: 'user-circle',
  },
]

interface MenuSideBarProps {}

export default function MenuSideBar(props: MenuSideBarProps) {
  return (
    <section className="MenuSideBar-module hover">
      {menu_items.map((item, i) => (
        <NavLink
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