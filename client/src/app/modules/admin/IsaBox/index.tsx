import React from 'react'
import './style.scss'
import { ISA } from '../../../../interfaces/baseIntefaces'
import Button from '../../../components/Button'
import Field from '../../../components/Field'
import { formatDate } from '../../../../helpers/formattings'

interface IsaBoxProps {
  isa: ISA
}

export default function IsaBox(props: IsaBoxProps) {
  return (
    <section className="IsaBox-module">
      <header>
        <div className="left-actions">
          <Button>EDIT</Button>
        </div>
        <div className="right-actions">
          <Button>VIEW</Button>
        </div>
      </header>
      <div className="body">
        <div>
          <Field title="ID">{props.isa.id}</Field>
          <Field title="Created at">{formatDate(props.isa.created_at)}</Field>
          <Field title="Coach ID">{props.isa.coach}</Field>
          <Field title="Student ID">{props.isa.student}</Field>
          <Field title="Status">{props.isa.status}</Field>
        </div>
        <div>
          <Field title="CAP">{props.isa.cap}</Field>
          <Field title="Current income">{props.isa.current_income}</Field>
          <Field title="Percentage">{props.isa.percentage}</Field>
          <Field title="Time to be paid">{props.isa.time_to_be_paid}</Field>
        </div>
        <Field title="description">{props.isa.description}</Field>
      </div>
      <footer></footer>
    </section>
  )
}
