import React from 'react'
import './style.scss'
import AdminHeader from '../../../modules/admin/AdminHeader'

export default function AdminPlaid(props: any) {
  return (
    <article className="AdminPlaid-page">
      <AdminHeader user={props.currentUser} />
      <div className="content"></div>
    </article>
  )
}
