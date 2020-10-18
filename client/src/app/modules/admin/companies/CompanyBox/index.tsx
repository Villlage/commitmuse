import React from 'react'
import './style.scss'
import { Company } from '../../../../../interfaces/baseIntefaces'
import Button from '../../../../components/Button'
import Field from '../../../../components/Field'
import { formatLongDate } from '../../../../../helpers/formattings'
import { notEmptyArray } from '../../../../../helpers/base'

interface CompanyBoxProps {
  company: Company
}

export default function CompanyBox(props: CompanyBoxProps) {
  return (
    <section className="CompanyBox-module">
      <header>
        <h2>
          Name: <span>{props.company.name}</span>
        </h2>
        <div className="actions">
          <Button>EDIT</Button>
        </div>
      </header>
      <div className="body">
        <div>
          <Field title="ID">{props.company.id}</Field>
          <Field title="Created at">{formatLongDate(props.company.created_at)}</Field>
          <Field title="number_of_employees_estimate">{props.company.number_of_employees_estimate || '-'}</Field>
          <Field title="Status">{props.company.status}</Field>
        </div>
        <div>
          <Field title="Is active">
            {props.company.is_active ? <i className="green">Yes</i> : <i className="red">No</i>}
          </Field>
          <Field title="Users">
            {notEmptyArray(props.company.users) ? props.company.users.join(', ') : <i className="red">None</i>}
          </Field>
          <Field title="Subscriptions">
            {notEmptyArray(props.company.subscriptions) ? (
              props.company.subscriptions.join(', ')
            ) : (
              <i className="red">None</i>
            )}
          </Field>
        </div>
        <Field title="Address" className="full">{props.company.address}</Field>
      </div>
      <footer></footer>
    </section>
  )
}