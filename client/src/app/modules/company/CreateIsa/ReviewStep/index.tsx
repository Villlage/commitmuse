import './style.scss'
import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import TooltipBadge from '../../../../components/TooltipBadge'
import { isNumber } from '../../../../../helpers/base'
import IsaAssessment from '../../../common/IsaAssessment'
import Field from '../../../../components/Field'
import ButtonSelect from '../../../../components/ButtonSelect'
import Icon from '../../../../components/Icon'
import { IsaClient, IsaProgram } from '../../../../../interfaces/baseIntefaces'

const pricing = ['From total income', 'From new raise', 'Placement']

interface ReviewStepProps {
  client: IsaClient
  program: IsaProgram
  offer: any
  total_income: any
  onChange(e: string, key: string): void
  onNext(): void
}

export default function ReviewStep(props: ReviewStepProps) {
  const [loading, set_loading] = useState(false)

  const notValid = () => Object.values(props.total_income).some(i => i === '')

  const addComma = (str: string) => {
    return Number(str.replace(/,/g, '')).toLocaleString()
  }

  return (
    <section className="ReviewStep-module">
      <h2>REVIEW your isa offer</h2>
      <header>
        <h2 className="full">Client Information</h2>
        <Field title="First Name">{props.client.first_name}</Field>
        <Field title="Last Name">{props.client.last_name}</Field>
        <Field className="full" title="Email Address">
          {props.client.email}
        </Field>
      </header>
      <section className="program-info">
        <h2>Program Information</h2>
        <Field title="Job Field">{props.program.field}</Field>
        <Input disabled onChange={e => null} placeholder="Duration" value={props.program.duration} postFix="Weeks" />
        <Field title="description">{props.program.description}</Field>
      </section>
      <section className="offer-details">
        <h2>Offer Details</h2>
        <TooltipBadge label="Pricing" tooltip="help text" />
        <ButtonSelect options={pricing} selected={props.offer.type} onSelect={() => null} />
        <Input
          onChange={e => props.onChange(e, 'description')}
          placeholder="Description"
          value={props.total_income.description}
        />
        <Input
          postFix="$"
          onChange={e => props.onChange(e, 'current_income')}
          placeholder="Current income"
          value={addComma(props.total_income.current_income)}
        />
        <Input
          postFix="%"
          onChange={e => isNumber(e) && Number(e) > 0 && Number(e) < 100 && props.onChange(e, 'percentage')}
          placeholder="Percentage to be Paid"
          value={props.total_income.percentage}
        />
        <Input
          postFix="Months"
          onChange={e => isNumber(e) && props.onChange(e, 'time_to_be_paid')}
          placeholder="Time to be Paid"
          value={props.total_income.time_to_be_paid}
        />
        <Input
          postFix="USD"
          onChange={e => props.onChange(e, 'cap')}
          placeholder="Maximum to be paid"
          value={addComma(props.total_income.cap)}
        />
        <Input
          postFix="Week(s)"
          onChange={e => isNumber(e) && props.onChange(e, 'cancellation_period')}
          placeholder="Cancellation Period"
          value={props.total_income.cancellation_period}
        />
        <Input
          postFix="%"
          onChange={e => isNumber(e) && props.onChange(e, 'risk')}
          placeholder="Risk Assessment"
          value={props.total_income.risk}
        />
        {!notValid() && <IsaAssessment />}
      </section>
      <footer>
        <Button
          background="MainWarning"
          onClick={async () => {
            set_loading(true)
            await props.onNext()
          }}
          disabled={notValid()}
          className="next-btn"
          loading={loading}
        >
          Next <Icon icon="arrow-right" style={{ marginLeft: 6 }} />
        </Button>
      </footer>
    </section>
  )
}