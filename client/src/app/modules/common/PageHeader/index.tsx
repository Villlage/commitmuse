import * as React from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import { User } from '../../../../interfaces/baseIntefaces'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'
import { useState } from 'react'
import Auth from '../../auth'

interface PageHeaderProps {
  user?: User
  fetchUser(): void
}

export default function PageHeader(props: PageHeaderProps) {
  const [show_auth, set_show_auth] = useState(false)
  const history = useHistory()
  return (
    <>
      <header className="PageHeader-module">
        <nav>
          <div onClick={() => history.push('/my-isa')} className="logo">
            <img src="/assets/icons/rocket.svg" alt="logo" />
            <p>LOGO</p>
          </div>
          <div className="profile">
            {props.user ? (
              <>
                {props.user.profile_picture_link ? (
                  <>
                    <Icon icon="bell" className="notification" />
                    <img src={props.user.profile_picture_link} className="profile_pic" alt="profile_pic" />
                    <Icon icon="caret-down" />
                  </>
                ) : (
                  <Icon icon="person" />
                )}
              </>
            ) : (
              <Button onClick={() => set_show_auth(true)}>Sign in</Button>
            )}
          </div>
        </nav>
      </header>
      <Auth fetchUser={props.fetchUser} isOpen={show_auth} onClose={() => set_show_auth(false)} />
    </>
  )
}
