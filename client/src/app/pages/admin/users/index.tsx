import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps, User } from '../../../../interfaces/baseIntefaces'
import AdminService from '../../../../services/admin.service'
import { log } from '../../../../services/logging.service'
import { notEmptyArray } from '../../../../helpers/base'
import AdminUserBox from '../../../modules/admin/users/UserBox'
import PageContent from '../../../modules/common/PageContent'
import EditUser from './edit-user'

const adminService = new AdminService()

interface AdminUsersProps extends ScreenProps {}

export default function AdminUsers(props: AdminUsersProps) {
  const [loading, set_loading] = useState(true)
  const [edit_user, set_edit_user] = useState<User | null>(null)
  const [users, set_users] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const res = await adminService.getUsers()
      set_users(res)
    } catch (e) {
      log(e)
    }
  }

  useLayoutEffect(() => {
    fetchUsers()
  }, [])

  return (
    <article className="AdminUsers-page">
      <PageContent title="Admin Users">
        <div className="wrapper">
          {notEmptyArray(users) && users.map(u => <AdminUserBox key={u.id} user={u} onEdit={() => set_edit_user(u)} />)}
        </div>
      </PageContent>
      <EditUser user={edit_user} onClose={() => set_edit_user(null)}/>
    </article>
  )
}
