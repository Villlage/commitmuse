import * as React from 'react'
import './style.scss'
import { Link, useHistory } from 'react-router-dom'
import { User } from '../../../../interfaces/baseIntefaces'
import Icon from '../../../components/Icon'
import Button from '../../../components/Button'
import { useState } from 'react'
import AuthService from '../../../../services/auth.service'
import { log } from '../../../../services/logging.service'

const authService = new AuthService()

interface PageHeaderProps {
  user?: User
}

export default function PageHeader(props: PageHeaderProps) {
  const [show_menu, set_show_menu] = useState(false)
  const history = useHistory()

  const onLogout = async () => {
    try {
      await authService.signOut()
      history.push('/login')
    } catch (e) {
      log(e)
    }
  }

  return (
    <>
      <header className="PageHeader-module">
        <nav>
          <div className="logo" onClick={() => history.push('/my-isa')}>
            <img src="/web/assets/images/logo.png" alt="logo" />
          </div>
          {props.user && props.user.user_role === 1 && <Link className="switch" to={'/admin/users'}>Admin portal</Link>}
          <div className="profile">
            {props.user ? (
              <>
                <Icon icon="bell" className="notification" />
                <Link to="/settings">
                  <Icon icon="gear" /> Settings
                </Link>
                <div className="auth-menu" onClick={() => set_show_menu(!show_menu)}>
                  {props.user.profile_picture_link && props.user.profile_picture_link.length > 6 ? (
                    <img src={props.user.profile_picture_link} className="profile_pic" alt="profile_pic" />
                  ) : (
                    <Icon className="profile_pic" icon="person" />
                  )}
                  <Icon icon="caret-down" />
                  {show_menu && (
                    <div className="hidden-menu">
                      <Button onClick={onLogout}>Logout</Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button>Sign in</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
