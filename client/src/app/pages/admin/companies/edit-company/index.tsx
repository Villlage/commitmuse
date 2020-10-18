import React from 'react'
import './style.scss'
import SlideSidebar from '../../../../modules/common/SlideSidebar'
import { Company } from '../../../../../interfaces/baseIntefaces'
import InputRow from '../../../../modules/admin/common/InputRow'
import { log } from '../../../../../services/logging.service'
import AdminService from '../../../../../services/admin.service'

const adminService = new AdminService()

interface EditCompanyProps {
  company: Company | null
  onClose(): void
  onSave(): void
}

export default function EditCompany(props: EditCompanyProps) {
  const onSave = async (key: string, value: any) => {
    if (props.company) {
      try {
        const res = await adminService.editCompany(props.company.id, { [key]: value })
        if (res) {
          props.onSave()
        }
      } catch (e) {
        log(e)
      }
    }
  }

  return (
    <SlideSidebar open={!!props.company} onClose={props.onClose} className="EditUser-sidebar">
      {props.company && (
        <>
          <h2>
            <span>Edit Company: </span> {props.company.name} [{props.company.id}]
          </h2>
          <section className="form">
            <InputRow onSave={async e => await onSave('name', e)} placeholder="Name" value={props.company.name} />
            <InputRow
              onSave={async e => await onSave('address', e)}
              placeholder="Address"
              value={props.company.address}
            />
            <InputRow
              isSelect
              placeholder="Number of people in the company"
              options={['1', '2-10', '10-50', '50+']}
              onSave={async e => await onSave('number_of_employees_estimate', e)}
              value={props.company.number_of_employees_estimate}
            />
            <InputRow
              isSelect
              options={['active', 'in_review', 'inactive']}
              onSave={async e => await onSave('status', e)}
              placeholder="Status"
              value={props.company.status}
            />
          </section>
        </>
      )}
    </SlideSidebar>
  )
}
