import React, { useState } from 'react'
import './style.scss'
import Input from '../../../../components/Input'
import TooltipBadge from '../../../../components/TooltipBadge'
import { fixClass, validateEmail } from '../../../../../helpers/base'
import { emailErrorMessage } from '../../../../../constants/auth'

const pricing = ['From total income', 'From new raise', 'Placement']

type IncomeKeys = 'description' | 'percentage' | 'months' | 'maximum' | 'cancellation_period' | 'risk'

interface ClientInfoProps {}

export default function ClientInfo(props: ClientInfoProps) {
  const [selected_pricing, set_selected_pricing] = useState(pricing[0])

  const [user, set_user] = useState({
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

  const onReview = () => null

  return (
    <section className="ClientInfo-module">
      <header>
        <h2>Client Information</h2>
        <Input onChange={e => set_user({ ...user, first_name: e })} value={user.first_name} placeholder="First Name" />
        <Input onChange={e => set_user({ ...user, last_name: e })} value={user.last_name} placeholder="Last Name" />
        <Input
          className="email"
          error={error.email}
          onChange={e => {
            set_error({ ...error, email: '' })
            set_user({ ...user, email: e })
            !validateEmail(e) && set_error({ ...error, email: emailErrorMessage })
          }}
          value={user.email}
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
          <Input onChange={e => setIncome(e, 'description')} placeholder="Description" value={''} />
          {selected_pricing === 'From total income' && (
            <>
              <Input onChange={e => setIncome(e, 'percentage')} placeholder="Percentage to be Paid" value={''} />
              <Input onChange={e => setIncome(e, 'months')} placeholder="Time to be Paid" value={''} />
              <Input onChange={e => setIncome(e, 'maximum')} placeholder="Maximum to be paid" value={''} />
              <Input onChange={e => setIncome(e, 'cancellation_period')} placeholder="Cancellation Period" value={''} />
              <Input onChange={e => setIncome(e, 'risk')} placeholder="Risk Assessment" value={''} />
              <div className="isa-assessment">
                <TooltipBadge label="Isa assessment" tooltip="help text" />
                <p>This ISA looks good!</p>
              </div>
            </>
          )}
        </div>
      </footer>
      {selected_pricing.length > 0 && (
        <div className="actions">
          <button onClick={() => onReview()}>REVIEW and send offer</button>
        </div>
      )}
    </section>
  )
}
