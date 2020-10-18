import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps, User } from '../../../../interfaces/baseIntefaces'
import AdminService from '../../../../services/admin.service'
import { log } from '../../../../services/logging.service'
import { notEmptyArray } from '../../../../helpers/base'
import AdminUserBox from '../../../modules/admin/users/UserBox'
import PageContent from '../../../modules/common/PageContent'
import EditUser from './edit-user'
import _ from 'lodash'

const adminService = new AdminService()

interface AdminUsersProps extends ScreenProps {}

export default function AdminUsers(props: AdminUsersProps) {
  const [loading, set_loading] = useState(true)
  const [edit_user, set_edit_user] = useState<User | null>(null)
  const [users, set_users] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      set_loading(true)
      const res = await adminService.getUsers()
      set_users(_.sortBy(res, 'user_type'))
      set_loading(false)
    } catch (e) {
      log(e)
      set_loading(false)
    }
  }

  useLayoutEffect(() => {
    fetchUsers()
  }, [])

  return (
    <article className="AdminUsers-page">
      <PageContent loading={loading} title="Admin Users">
        <div className="wrapper">
          {notEmptyArray(users) && users.map(u => <AdminUserBox key={u.id} user={u} onEdit={() => set_edit_user(u)} />)}
        </div>
      </PageContent>
      <EditUser onSave={fetchUsers} user={edit_user} onClose={() => set_edit_user(null)}/>
    </article>
  )
}
