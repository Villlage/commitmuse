import React from 'react'
import './style.scss'
import SlideSidebar from '../../../../modules/common/SlideSidebar'
import { User } from '../../../../../interfaces/baseIntefaces'
import InputRow from '../../../../modules/admin/common/InputRow'
import { makeName } from '../../../../../helpers/base'
import AdminService from '../../../../../services/admin.service'
import { log } from '../../../../../services/logging.service'

const adminService = new AdminService()

interface EditUserProps {
  user: User | null
  onClose(): void
  onSave(): void
}

export default function EditUser(props: EditUserProps) {
  const onSave = async (key: string, value: any) => {
    if (props.user) {
      try {
        const res = await adminService.editUser(props.user.id, { [key]: value })
        if (res) {
          props.onSave()
        }
      } catch (e) {
        log(e)
      }
    }
  }

  return (
    <SlideSidebar open={!!props.user} onClose={props.onClose} className="EditUser-sidebar">
      {props.user && (
        <>
          <h2>
            <span>Edit user: </span> {makeName(props.user)} [{props.user.id}]
          </h2>
          <section className="form">
            <InputRow
              onSave={async e => await onSave('first_name', e)}
              placeholder="First name"
              value={props.user.first_name}
            />
            <InputRow
              onSave={async e => await onSave('last_name', e)}
              placeholder="Last name"
              value={props.user.last_name}
            />
          </section>
        </>
      )}
    </SlideSidebar>
  )
}
