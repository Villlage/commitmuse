import React from 'react'
import './style.scss'
import SlideSidebar from '../../../../modules/common/SlideSidebar'
import { User } from '../../../../../interfaces/baseIntefaces'
import InputRow from '../../../../modules/admin/users/InputRow'
import { makeName } from '../../../../../helpers/base'

interface EditUserProps {
  user: User | null
  onClose(): void
}

export default function EditUser(props: EditUserProps) {
  return (
    <SlideSidebar open={!!props.user} onClose={props.onClose} className="EditUser-sidebar">
      {props.user && (
        <>
          <h2>
            <span>Edit user: </span> {makeName(props.user)} [{props.user.id}]
          </h2>
          <section className="form">
            <InputRow userId={props.user.id} placeholder="First name" value={props.user.first_name} key="first_name" />
            <InputRow userId={props.user.id} placeholder="Last name" value={props.user.last_name} key="last_name" />
          </section>
        </>
      )}
    </SlideSidebar>
  )
}
