import './style.scss'
import React from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import TooltipBadge from '../../../../components/TooltipBadge'
import { fixClass, isNumber, validateEmail } from '../../../../../helpers/base'
import IsaAssessment from '../../../common/IsaAssessment'
import Field from '../../../../components/Field'

const pricing = ['From total income', 'From new raise', 'Placement']

interface ReviewStepProps {
  selected_pricing: string
  client: any
  total_income: any
  onChange(e: string, key: string): void
  setPricing(e: string): void
  onNext(): void
}

export default function ReviewStep(props: ReviewStepProps) {

  const notValid = () =>
    Object.values(props.client).some(i => i === '') ||
    Object.values(props.total_income).some(i => i === '') ||
    !validateEmail(props.client.email)

  const addComma = (str: string) => {
    return Number(str.replace(/,/g, '')).toLocaleString()
  }

  return (
    <section className="ReviewStep-module">
      <h2>REVIEW your isa offer</h2>
      <header>
        <Field title="First Name">{props.client.first_name}</Field>
        <Field title="Last Name">{props.client.last_name}</Field>
        <Field title="Email Address">{props.client.email}</Field>
      </header>
      <section className="client-info">
          <h2>Offer Details</h2>
          <TooltipBadge label="Pricing" tooltip="help text" />
          <div className="selects">
            {pricing.map((item, i) => (
              <button
                key={i}
                className={`${fixClass(props.selected_pricing === item && 'selected')}`}
                onClick={() => props.setPricing(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="form">
            <Input
              onChange={e => props.onChange(e, 'description')}
              placeholder="Description"
              value={props.total_income.description}
            />
            {props.selected_pricing === 'From total income' && (
              <>
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
              </>
            )}
          </div>
      </section>
      <footer>
        <Button background="MainWarning" onClick={props.onNext}>Next</Button>
      </footer>
    </section>
  )
}