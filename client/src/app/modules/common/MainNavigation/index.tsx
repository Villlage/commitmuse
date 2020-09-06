import React, { useEffect, useState } from 'react'
import './style.scss'
import { NavLink, useHistory } from 'react-router-dom'
import Icon from 'app/components/Icon'

const forbiddenRoutes = ['register', 'company/register', 'company/subscription']

type MenuItem = {
  label: string
  route: string
  icon: string
  active: boolean
}

interface MainNavigationProps {
  items: Array<{ label: string; subItems: Array<MenuItem> }>
}

export default function MainNavigation(props: MainNavigationProps) {
  const history = useHistory()

  const [isHidden, setIsHidden] = useState(forbiddenRoutes.some(route => history.location.pathname.includes(route)))

  let unListen: Function
  useEffect(() => {
    unListen = history.listen(() => {
      setIsHidden(forbiddenRoutes.some(route => history.location.pathname.includes(route)))
    })

    return () => {
      unListen()
    }
  }, [])

  return (
    <section className={`MainNavigation-module ${isHidden && 'hidden'}`}>
      {props.items.map((item, index) => {
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
