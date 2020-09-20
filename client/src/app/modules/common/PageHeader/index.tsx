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
  setCurrentUser(u: User | null): void
}

export default function PageHeader(props: PageHeaderProps) {
  const [show_menu, set_show_menu] = useState(false)
  const history = useHistory()

  const onLogout = async () => {
    try {
      await authService.signOut()
      props.setCurrentUser(null)
      history.push('/login')
    } catch (e) {
      log(e)
    }
  }

  return (
    <>
      <header className="PageHeader-module">
        <nav>
          <div
            className="logo"
            onClick={() => {
              if (props.user) {
                return props.user.company ? history.push('/company/dashboard') : history.push('/my-isa')
              }
              history.push('/login')
            }}
          >
            <img src="/web/assets/images/logo.png" alt="logo" />
          </div>
          {props.user && props.user.user_role === 1 && (
            <Link className="switch" to={'/admin/users'}>
              Admin portal
            </Link>
          )}
          <div className="profile">
            {props.user ? (
              <>
                <Icon icon="bell" className="notification" />
                <div className="auth-menu" onClick={() => set_show_menu(!show_menu)}>
                  {props.user.profile_picture_link && props.user.profile_picture_link.length > 6 ? (
                    <img src={props.user.profile_picture_link} className="profile_pic" alt="profile_pic" />
                  ) : (
                    <div className="initials">
                      <h2>
                        {props.user.first_name[0]}
                        {props.user.last_name[0]}
                      </h2>
                    </div>
                  )}
                  <Icon style={{ marginLeft: 6 }} icon="caret-down" />
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
        <div className="top-wrapper" />
      </header>
    </>
  )
}
