import * as React from 'react'
import './style.scss'
import { Link, useHistory } from 'react-router-dom'
import { User } from '../../../../interfaces/baseIntefaces'
import Icon from '../../../components/Icon'
import Button from '../../../components/Button'

interface PageHeaderProps {
  user?: User
}

export default function PageHeader(props: PageHeaderProps) {
  const history = useHistory()
  return (
    <>
      <header className="PageHeader-module">
        <nav>
          <div className="logo" onClick={() => history.push('/my-isa')}>
            <img src="/web/assets/images/logo.png" alt="logo" />
          </div>
          <div className="profile">
            {props.user ? (
              <>
                <Icon icon="bell" className="notification" />
                <Link to="/settings"><Icon icon="gear"/> Settings</Link>
                {props.user.profile_picture_link ? (
                  <img src={props.user.profile_picture_link} className="profile_pic" alt="profile_pic" />
                ) : (
                  <Icon className="profile_pic" icon="person" />
                )}
                <Icon icon="caret-down" />
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
