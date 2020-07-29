import React, { useState } from 'react'
import './style.scss'
import Input from '../../../../components/Input'
import TooltipBadge from '../../../../components/TooltipBadge'
import { fixClass, isNumber, validateEmail } from '../../../../../helpers/base'
import { emailErrorMessage } from '../../../../../constants/auth'
import Button from '../../../../components/Button'

const pricing = ['From total income', 'From new raise', 'Placement']

type IncomeKeys = 'description' | 'percentage' | 'months' | 'maximum' | 'cancellation_period' | 'risk'

interface ClientInfoProps {}

export default function ClientInfo(props: ClientInfoProps) {
  const [selected_pricing, set_selected_pricing] = useState(pricing[0])

  const [client, set_client] = useState({
    email: '',
    first_name: '',
    last_name: '',
  })

  const [error, set_error] = useState({
    email: '',
    first_name: '',
    last_name: '',
  })

  const [total_income, set_total_income] = useState({
    description: '',
    percentage: '',
    months: '',
    maximum: '',
    cancellation_period: '',
    risk: '',
  })

  const setIncome = (e: string, key: IncomeKeys) => set_total_income({ ...total_income, [key]: e })

  const notValid = () =>
    Object.values(client).some(i => i === '') ||
    Object.values(total_income).some(i => i === '') ||
    !validateEmail(client.email)

  const onReview = () => null

  return (
    <section className="ClientInfo-module">
      <header>
        <h2>Client Information</h2>
        <Input
          withRipple
          onChange={e => set_client({ ...client, first_name: e })}
          value={client.first_name}
          placeholder="First Name"
        />
        <Input
          withRipple
          onChange={e => set_client({ ...client, last_name: e })}
          value={client.last_name}
          placeholder="Last Name"
        />
        <Input
          withRipple
          className="email"
          error={error.email}
          onChange={e => {
            set_error({ ...error, email: '' })
            set_client({ ...client, email: e })
            !validateEmail(e) && set_error({ ...error, email: emailErrorMessage })
          }}
          value={client.email}
          placeholder="Email Address"
        />
      </header>
      <footer>
        <h2>Offer Details</h2>
        <TooltipBadge label="Pricing" tooltip="help text" />
        <div className="selects">
          {pricing.map((item, i) => (
            <button
              key={i}
              className={`${fixClass(selected_pricing === item && 'selected')}`}
              onClick={() => set_selected_pricing(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="form">
          <Input
            withRipple
            onChange={e => setIncome(e, 'description')}
            placeholder="Description"
            value={total_income.description}
          />
          {selected_pricing === 'From total income' && (
            <>
              <Input
                withRipple
                postFix="%"
                onChange={e => isNumber(e) && setIncome(e, 'percentage')}
                placeholder="Percentage to be Paid"
                value={total_income.percentage}
              />
              <Input
                withRipple
                postFix="Months"
                onChange={e => isNumber(e) && setIncome(e, 'months')}
                placeholder="Time to be Paid"
                value={total_income.months}
              />
              <Input
                withRipple
                postFix="USD"
                onChange={e => isNumber(e) && setIncome(e, 'maximum')}
                placeholder="Maximum to be paid"
                value={total_income.maximum}
              />
              <Input
                withRipple
                postFix="Weeks"
                onChange={e => isNumber(e) && setIncome(e, 'cancellation_period')}
                placeholder="Cancellation Period"
                value={total_income.cancellation_period}
              />
              <Input
                withRipple
                postFix="%"
                onChange={e => isNumber(e) && setIncome(e, 'risk')}
                placeholder="Risk Assessment"
                value={total_income.risk}
              />
              {!notValid() && (
                <div className="isa-assessment">
                  <TooltipBadge label="Isa assessment" tooltip="help text" />
                  <p>This ISA looks good!</p>
                </div>
              )}
            </>
          )}
        </div>
      </footer>
      {selected_pricing.length > 0 && (
        <div className="actions">
          <Button disabled={notValid()} onClick={() => onReview()}>
            REVIEW and send offer
          </Button>
        </div>
      )}
    </section>
  )
}
