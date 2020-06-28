import * as React from 'react'
import './style.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { User } from '../../../../interfaces/baseIntefaces'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'

interface PageHeaderProps {
  user?: User
}

export default function PageHeader(props: PageHeaderProps) {
  const history = useHistory()
  return (
    <header className="PageHeader-module">
      <nav>
        <div onClick={() => history.push('/my-isa')} className="logo">
          <img src="/assets/icons/logo.svg" alt="logo" />
          <p>LOGO</p>
        </div>
        <div className="profile">
          {props.user ? (
            <>
              {props.user.profile_picture_link ? (
                <img src={props.user.profile_picture_link} alt="profile_pic" />
              ) : (
                <Icon icon="person" />
              )}
              {props.user.first_name + ' ' + props.user.last_name}
            </>
          ) : (
            <Button
              onClick={() => {
                return history.push('/welcome')
              }}
            >
              Sign in
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
