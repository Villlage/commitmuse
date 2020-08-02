import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../../modules/common/PageHeader'
import PageContent from '../../../../../modules/common/PageContent'
import FAQ from '../../../../../modules/company/CreateIsa/FAQ'
import React, { useState } from 'react'
import { fixClass, isNumber, validateEmail } from '../../../../../../helpers/base'
import Input from '../../../../../components/Input'
import TooltipBadge from '../../../../../components/TooltipBadge'
import { emailErrorMessage } from '../../../../../../constants/auth'
import Button from '../../../../../components/Button'
import IsaService from '../../../../../../services/isa.service'
import Message from '../../../../../components/Message'
import IsaAssessment from '../../../../../modules/common/IsaAssessment'

const isaService = new IsaService()

const pricing = ['From total income', 'From new raise', 'Placement']

type IncomeKeys = 'description' | 'percentage' | 'months' | 'maximum' | 'cancellation_period' | 'risk' | 'current_income'
interface CreateIsaProps extends ScreenProps {}

export default function CreateIsa(props: CreateIsaProps) {
  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')
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
    current_income: '',
  })

  const setIncome = (e: string, key: IncomeKeys) => set_total_income({ ...total_income, [key]: e })

  const notValid = () =>
    Object.values(client).some(i => i === '') ||
    Object.values(total_income).some(i => i === '') ||
    !validateEmail(client.email)

  const sendOffer = async () => {
    set_loading(true)
    try {
      const res = await isaService.create({
        current_income: Number(total_income.current_income),
        percentage: Number(total_income.percentage),
        cap: Number(total_income.cancellation_period),
        time_to_be_paid: Number(total_income.months),
        status: 'created',
        description: total_income.description,
        client,
        coach_id: props.currentUser.id,
      })

      if (res && res.error) {
        set_loading(false)
        set_request_error(res.error)
        return setTimeout(() => set_request_error(''), 3000)
      }
      set_loading(false)

    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  return (
    <article className="CreateIsa-page">
      <PageHeader user={props.currentUser} />
      <PageContent title="New ISA Offer">
        <section className="container">
          <section className="client-info">
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
                      onChange={e => isNumber(e) && setIncome(e, 'current_income')}
                      placeholder="Current income"
                      value={total_income.current_income}
                    />
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
                    {!notValid() && <IsaAssessment/>}
                  </>
                )}
              </div>
            </footer>
            {selected_pricing.length > 0 && (
              <div className="actions">
                <Button disabled={notValid()} onClick={sendOffer} loading={loading}>
                  REVIEW and send offer
                </Button>
              </div>
            )}
          </section>

          <FAQ />
        </section>
      </PageContent>
      <Message message={request_error}/>
    </article>
  )
}
