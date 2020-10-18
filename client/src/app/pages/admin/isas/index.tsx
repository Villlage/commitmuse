import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import AdminService from '../../../../services/admin.service'
import { ISA, ScreenProps } from '../../../../interfaces/baseIntefaces'
import { log } from '../../../../services/logging.service'
import { notEmptyArray } from '../../../../helpers/base'
import IsaBox from '../../../modules/admin/isas/IsaBox'
import PageContent from '../../../modules/common/PageContent'

const adminService = new AdminService()

interface AdminIsasProps extends ScreenProps {}

export default function AdminIsas(props: AdminIsasProps) {
  const [loading, set_loading] = useState<boolean>(true)
  const [isas, set_isas] = useState<ISA[]>([])

  const fetchIsas = async () => {
    try {
      set_loading(true)
      const res = await adminService.getIsas()
      set_isas(res)
      set_loading(false)
    } catch (e) {
      log(e)
      set_loading(false)
    }
  }

  useLayoutEffect(() => {
    fetchIsas()
  }, [])

  return (
  <article className="AdminIsas-page">
    <PageContent loading={loading} title="Admin ISAs">
      <div className="wrapper">
        {notEmptyArray(isas) && isas.map((isa, i) => <IsaBox key={i} isa={isa} />)}
      </div>
    </PageContent>
  </article>
  )
}
