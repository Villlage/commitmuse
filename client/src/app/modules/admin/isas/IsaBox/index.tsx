import React from 'react'
import './style.scss'
import { ISA } from '../../../../../interfaces/baseIntefaces'
import Button from '../../../../components/Button'
import Field from '../../../../components/Field'
import { formatLongDate } from '../../../../../helpers/formattings'

interface IsaBoxProps {
  isa: ISA
}

export default function IsaBox(props: IsaBoxProps) {
  return (
    <section className="IsaBox-module">
      <header>
        <h2>
          ID: <span>{props.isa.id}</span>
        </h2>
        <div className="actions">
          <Button>EDIT</Button>
        </div>
      </header>
      <div className="body">
        <div>
          <Field title="Created at">{formatLongDate(props.isa.created_at)}</Field>
          <Field title="Coach ID">{props.isa.coach}</Field>
          <Field title="Student ID">{props.isa.student}</Field>
          <Field title="Status">{props.isa.status || '-'}</Field>
          <Field title="Cancellation period">{props.isa.cancellation_period_weeks} weeks</Field>
          <Field title="Time to be paid">{props.isa.time_to_be_paid}</Field>
        </div>
        <div>
          <Field title="CAP">{props.isa.cap}</Field>
          <Field title="Current income">{props.isa.current_income}</Field>
          <Field title="Percentage">{props.isa.percentage}</Field>
          <Field title="Time to be paid">{props.isa.time_to_be_paid}</Field>
          <Field title="Expiration period">
            {props.isa.expiration_period_months ? props.isa.expiration_period_months + ' months' : '-'}
          </Field>
        </div>
        <Field title="description">{props.isa.description}</Field>
      </div>
      <footer></footer>
    </section>
  )
}
