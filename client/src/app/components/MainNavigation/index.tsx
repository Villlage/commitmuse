import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import Icon from 'app/components/Icon'

type MenuItem = {
  label: string
  route: string
  icon: string
  active: boolean
}

interface Props {
  items: Array<{ label: string; subItems: Array<MenuItem> }>
}

const MainNavigation = (props: Props) => {
  const { items } = props

  return (
    <section className="mainNavigation">
      {items.map((item, index) => {
        return (
          <div className="menuItems" key={`menu-items-${index}`}>
            {item.label && <div className="header">{item.label}</div>}
            {item.subItems.map((subItem, index) => (
              <NavLink
                aria-disabled={!subItem.active}
                key={index}
                className="menuItem"
                activeClassName="active"
                to={subItem.route}
              >
                <div>
                  <Icon icon={subItem.icon as any} />
                </div>
                <p>{subItem.label}</p>
              </NavLink>
            ))}
          </div>
        )
      })}
    </section>
  )
}

export default MainNavigation
