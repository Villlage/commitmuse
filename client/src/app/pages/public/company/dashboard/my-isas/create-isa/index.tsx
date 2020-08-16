import './style.scss'
import React, { useState } from 'react'
import { ScreenProps } from '../../../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../../../modules/common/PageContent'
import FAQ from '../../../../../../modules/company/CreateIsa/FAQ'
import { fixClass, isNumber, validateEmail } from '../../../../../../../helpers/base'
import { emailErrorMessage } from '../../../../../../../constants/auth'
import Input from '../../../../../../components/Input'
import TooltipBadge from '../../../../../../components/TooltipBadge'
import Button from '../../../../../../components/Button'
import IsaService from '../../../../../../../services/isa.service'
import Message from '../../../../../../components/Message'
import IsaAssessment from '../../../../../../modules/common/IsaAssessment'
import ISACalculator from '../../../../../../modules/on-boarding/ISACalculator'
import MenuSideBar from '../../../../../../modules/company/MenuSideBar'

const isaService = new IsaService()

const pricing = ['From total income', 'From new raise', 'Placement']
const OFFER_STEPS = ['client', 'program', 'isa offer', 'review', 'contract']

type IncomeKeys =
  | 'description'
  | 'percentage'
  | 'time_to_be_paid'
  | 'cap'
  | 'cancellation_period'
  | 'risk'
  | 'current_income'

interface CreateIsaProps extends ScreenProps {}

export default function CompanyCreateIsa(props: CreateIsaProps) {
  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')
  const [selected_pricing, set_selected_pricing] = useState(pricing[0])
  const [active_step, set_active_step] = useState(0)

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
    percentage: '17',
    time_to_be_paid: '2',
    cap: '10000',
    cancellation_period: '2',
    risk: '20',
    current_income: '80000',
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
        current_income: removeComma(total_income.current_income),
        percentage: Number(total_income.percentage),
        cap: removeComma(total_income.cap),
        cancellation_period_weeks: Number(total_income.cancellation_period),
        time_to_be_paid: Number(total_income.time_to_be_paid),
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

      return props.history.push(`/isa/${res.id}`)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const addComma = (str: string) => {
    return Number(str.replace(/,/g, '')).toLocaleString()
  }

  const removeComma = (str: string) => {
    return Number(str.replace(/,/g, ''))
  }

  const offer_step_strategy: any = {
    client: '',
    program: '',
    'isa offer': '',
    review: '',
    contract: '',
  }

  return (
    <article className="CompanyCreateIsa-page">
      <MenuSideBar />
      <PageContent title="New ISA Offer">
        <section className="container">
          <section className="offer-steps">
            {/*<Stepper steps={OFFER_STEPS} activeIndex={active_step}/>*/}
            {/*{offer_step_strategy[OFFER_STEPS[active_step]]}*/}
          </section>
          <section className="client-info">
            <header>
              <h2>Client Information</h2>
              <Input
                onChange={e => set_client({ ...client, first_name: e })}
                value={client.first_name}
                placeholder="First Name"
              />
              <Input
                onChange={e => set_client({ ...client, last_name: e })}
                value={client.last_name}
                placeholder="Last Name"
              />
              <Input
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
                  onChange={e => setIncome(e, 'description')}
                  placeholder="Description"
                  value={total_income.description}
                />
                {selected_pricing === 'From total income' && (
                  <>
                    <Input
                      postFix="$"
                      onChange={e => setIncome(e, 'current_income')}
                      placeholder="Current income"
                      value={addComma(total_income.current_income)}
                    />
                    <Input
                      postFix="%"
                      onChange={e => isNumber(e) && Number(e) > 0 && Number(e) < 100 && setIncome(e, 'percentage')}
                      placeholder="Percentage to be Paid"
                      value={total_income.percentage}
                    />
                    <Input
                      postFix="Months"
                      onChange={e => isNumber(e) && setIncome(e, 'time_to_be_paid')}
                      placeholder="Time to be Paid"
                      value={total_income.time_to_be_paid}
                    />
                    <Input
                      postFix="USD"
                      onChange={e => setIncome(e, 'cap')}
                      placeholder="Maximum to be paid"
                      value={addComma(total_income.cap)}
                    />
                    <Input
                      postFix="Weeks"
                      onChange={e => isNumber(e) && setIncome(e, 'cancellation_period')}
                      placeholder="Cancellation Period"
                      value={total_income.cancellation_period}
                    />
                    <Input
                      postFix="%"
                      onChange={e => isNumber(e) && setIncome(e, 'risk')}
                      placeholder="Risk Assessment"
                      value={total_income.risk}
                    />
                    {!notValid() && <IsaAssessment />}
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

          <section className="faq-and-calc">
            <ISACalculator
              current_income={removeComma(total_income.current_income)}
              percentage={Number(total_income.percentage)}
              months={Number(total_income.time_to_be_paid)}
              max={removeComma(total_income.cap)}
            />
            <FAQ />
          </section>
        </section>
      </PageContent>
      <Message message={request_error} />
    </article>
  )
}