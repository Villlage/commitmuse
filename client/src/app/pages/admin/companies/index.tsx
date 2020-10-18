import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { Company, ScreenProps } from '../../../../interfaces/baseIntefaces'
import PageContent from '../../../modules/common/PageContent'
import { notEmptyArray } from '../../../../helpers/base'
import { log } from '../../../../services/logging.service'
import AdminService from '../../../../services/admin.service'
import CompanyBox from '../../../modules/admin/companies/CompanyBox'

const adminService = new AdminService()

interface AdminCompaniesProps extends ScreenProps {}

export default function AdminCompanies(props: AdminCompaniesProps) {
  const [loading, set_loading] = useState<boolean>(true)
  const [companies, set_companies] = useState<Company[]>([])

  const fetchCompanies = async () => {
    try {
      set_loading(true)
      const res = await adminService.getCompanies()
      set_companies(res)
      set_loading(false)
    } catch (e) {
      log(e)
      set_loading(false)
    }
  }

  useLayoutEffect(() => {
    fetchCompanies()
  }, [])

  return (
    <article className="AdminCompanies-page">
      <PageContent loading={loading} title="Admin Companies">
        <div className="wrapper">
          {notEmptyArray(companies) && companies.map((company, i) => <CompanyBox company={company} key={i}/>)}
        </div>
      </PageContent>
    </article>
  )
}