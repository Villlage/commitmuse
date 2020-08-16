import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import AdminService from '../../../../services/admin.service'
import { ISA, ScreenProps } from '../../../../interfaces/baseIntefaces'
import { log } from '../../../../services/logging.service'
import { notEmptyArray } from '../../../../helpers/base'
import IsaBox from '../../../modules/admin/IsaBox'

const adminService = new AdminService()

interface AdminIsasProps extends ScreenProps {}

export default function AdminIsas(props: AdminIsasProps) {
  const [isas, set_isas] = useState<ISA[]>([])

  const fetchIsas = async () => {
    try {
      const res = await adminService.getIsas()
      set_isas(res)
    } catch (e) {
      log(e)
    }
  }

  useLayoutEffect(() => {
    fetchIsas()
  }, [])

  return (
    <article className="AdminIsas-page">
      <div className="content">{notEmptyArray(isas) && isas.map((isa, i) => <IsaBox key={i} isa={isa} />)}</div>
    </article>
  )
}
