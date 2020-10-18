import React from 'react'
import './style.scss'
import { User } from '../../../../../interfaces/baseIntefaces'
import Button from '../../../../components/Button'
import Icon from '../../../../components/Icon'
import Field from '../../../../components/Field'
import { fixClass } from '../../../../../helpers/base'

interface AdminUserBoxProps {
  user: User
  onEdit(): void
}

export default function AdminUserBox(props: AdminUserBoxProps) {
  return (
    <section className={`AdminUserBox-module${fixClass(props.user.user_type)}`}>
      <header>
        <div className="profile-photo">
          {props.user.profile_picture_link ? (
            <img src={props.user.profile_picture_link} alt="profile_picture" />
          ) : (
            <Icon icon="person" />
          )}
        </div>
        <div className="right-actions">
          <Button onClick={props.onEdit}>EDIT</Button>
        </div>
      </header>
      <div className="body">
        <Field title="ID">{props.user.id}</Field>
        <Field title="Name">
          {props.user.first_name} {props.user.last_name}
        </Field>
        <Field title="Email">{props.user.email}</Field>
        <Field title="Type">{props.user.user_type}</Field>
        <Field title="Company ID">[{props.user.company || '--'}]</Field>
      </div>
      <footer></footer>
    </section>
  )
}
