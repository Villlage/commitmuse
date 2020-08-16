import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps, User } from '../../../../interfaces/baseIntefaces'
import AdminService from '../../../../services/admin.service'
import { log } from '../../../../services/logging.service'
import { notEmptyArray } from '../../../../helpers/base'
import AdminUserBox from '../../../modules/admin/UserBox'

const adminService = new AdminService()

interface AdminUsersProps extends ScreenProps {}

export default function AdminUsers(props: AdminUsersProps) {
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
      <div className="content">{notEmptyArray(users) && users.map(u => <AdminUserBox key={u.id} user={u} />)}</div>
    </article>
  )
}
