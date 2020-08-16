import React from 'react'
import './style.scss'
import { User } from '../../../../interfaces/baseIntefaces'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'
import Field from '../../../components/Field'

interface AdminUserBoxProps {
  user: User
}

export default function AdminUserBox(props: AdminUserBoxProps) {
  return (
    <section className="AdminUserBox-module">
      <header>
        <div className="profile-photo">
          {props.user.profile_picture_link ? (
            <img src={props.user.profile_picture_link} alt="profile_picture" />
          ) : (
            <Icon icon="person" />
          )}
        </div>
        <div className="right-actions">
          <Button>EDIT</Button>
          <Button>VIEW</Button>
        </div>
      </header>
      <div className="body">
        <Field title="ID">{props.user.id}</Field>
        <Field title="Name">
          {props.user.first_name} {props.user.last_name}
        </Field>
        <Field title="Email">{props.user.email}</Field>
        <Field title="Type">{props.user.type}</Field>
      </div>
      <footer></footer>
    </section>
  )
}
