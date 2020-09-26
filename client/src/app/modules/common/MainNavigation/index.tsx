import React, { useEffect, useState } from 'react'
import './style.scss'
import { NavLink, useHistory } from 'react-router-dom'
import Icon from 'app/components/Icon'
import { fixClass, isMobile } from '../../../../helpers/base'
import Button from '../../../components/Button'
import PopUp from '../../../components/PopUp'

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
  const [show_mobile_menu, set_show_mobile_menu] = useState(false)

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

  const navLinks = props.items.map((item, index) => (
    <div className="menuItems" key={`menu-items-${index}`}>
      {item.label && <div className="header">{item.label}</div>}
      {item.subItems.map((subItem, index) => (
        <NavLink
          aria-disabled={!subItem.active}
          key={index}
          className="menuItem"
          activeClassName="active"
          to={subItem.route}
          onClick={() => set_show_mobile_menu(false)}
        >
          <div>
            <Icon icon={subItem.icon as any} />
          </div>
          <p>{subItem.label}</p>
        </NavLink>
      ))}
    </div>
  ))

  return (
    <section className={`MainNavigation-module${fixClass(isHidden && 'hidden')}${fixClass(isMobile && 'mobile')}`}>
      {isMobile ? (
        <Button onClick={() => set_show_mobile_menu(true)} className="mobile_menu-btn">
          <Icon icon="menu_line" />
          Menu
        </Button>
      ) : (
        navLinks
      )}

      {isMobile && (
        <PopUp isOpen={show_mobile_menu} onClose={() => set_show_mobile_menu(false)}>
          <section className="mobile-menu">{navLinks}</section>
        </PopUp>
      )}
    </section>
  )
}
