import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ISA, PlaidMetadata, ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import FAQ from '../../../../modules/company/CreateIsa/FAQ'
import ISACalculator from '../../../../modules/on-boarding/ISACalculator'
import Field from '../../../../components/Field'
import IsaAssessment from '../../../../modules/common/IsaAssessment'
import Button from '../../../../components/Button'
import currentEnv from '../../../../../config/environment'
import { usePlaidLink } from 'react-plaid-link'
import ClientIsaSignUp from '../isa-offer-steps/sign-up'
import PlaidService from '../../../../../services/plaid.service'
import ClientService from '../../../../../services/client.service'
import { fixClass, makeName, roundK } from '../../../../../helpers/base'

const plaidService = new PlaidService()
const clientService = new ClientService()
const offerStatuses = ['review offer', 'sign up', 'link bank', 'sign contract']

const PLANS = [
  {
    name: 'Single',
    price: 5000,
    description: 'Make a single upfront payment and get a huge discount on your ISA.',
    payments: [
      {
        count: 1,
        title: 'Upfront payment of $5,000',
      },
    ],
  },
  {
    name: 'Combined',
    price: 7000,
    description: 'Make a single upfront payment and 7 split payments on your ISA.',
    payments: [
      {
        count: 1,
        title: 'Upfront payment of $3,500',
      },
      {
        count: 7,
        title: 'Split payments of $500',
      },
    ],
  },
  {
    name: 'Split',
    price: 8000,
    description: 'Make a 16 split payments on your ISA.',
    payments: [
      {
        count: 16,
        title: 'Split payments of $500',
      },
    ],
  },
]

interface IsaOfferReviewProps extends ScreenProps {
  match: any
}

export default function IsaOfferReview(props: IsaOfferReviewProps) {
  const [isa, set_isa] = useState<ISA | null>(null)
  const [offer_step, set_offer_step] = useState(0)
  const [request_error, set_request_error] = useState('')
  const [selected_plan, set_selected_plan] = useState('Combined')

  const isa_id = props.match.params.id
  const token = props.location.search.split('?token=')[1]

  const getIsa = async () => {
    try {
      const res = await clientService.getOffer(isa_id)

      if (res) {
        if (res.error) {
          set_offer_step(offer_step - 1)
          set_request_error(res.error)
          setTimeout(() => set_request_error(''), 3000)
        } else {
          set_isa(res)
        }
      }
    } catch (e) {
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    getIsa()
  }, [])

  const onSuccess = async (token: string, metadata: PlaidMetadata) => {
    try {
      const res = await plaidService.createItem(token, metadata)

      if (res) {
        if (res.error || res.err_msg) {
          set_offer_step(offer_step - 1)
          set_request_error(res.error || res.err_msg)
          setTimeout(() => set_request_error(''), 3000)
        } else {
          props.history.push(`/isa/${isa_id || 1}`)
        }
      }
    } catch (e) {
      set_offer_step(offer_step - 1)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const handleSignUp = async () => {
    set_offer_step(offer_step + 1)
    await props.fetchUser()
    open()
  }

  const config = {
    clientName: 'Commit Muse',
    product: ['auth', 'transactions'],
    env: currentEnv().PLAID_ENV,
    publicKey: currentEnv().PLAID_PUBLIC_KEY,
    onSuccess: onSuccess,
    token: props.plaid_token,
  }

  const { open, ready, error } = usePlaidLink(config)
  const offer_strategy: any = isa && {
    'sign up': isa && (
      <ClientIsaSignUp email={isa.student.email} user_id={isa.student.id} onNext={handleSignUp} token={token} />
    ),
    'link bank': (
      <section className="link_bank">
        <Button background="MainWarning" onClick={() => open()}>
          Link Bank
        </Button>
      </section>
    ),
  }

  return (
    isa && (
      <article className="IsaOfferReview-page">
        <PageContent title="Review Your ISA Offer">
          <section className="offer">
            <header>
              <div className="logo">
                <img src="/web/assets/images/oxford_logo.png" alt="oxford_logo" />
                <div>
                  <h2>{makeName(isa.coach)}</h2>
                  <p>{isa.coach.email}</p>
                </div>
              </div>

              <div className="fields">
                <Field title="TO">{makeName(isa.student)}</Field>
                <Field>{''}</Field>
                <Field title="Job Field">{isa.industry_field || '-'}</Field>
                <Field title="Program  Duration">{isa.time_to_be_paid} Months</Field>
                <Field title="Current income">${roundK(isa.current_income)}K / YEAR</Field>
                <Field title="Future income">{roundK(isa.cap)}K / YEAR</Field>
                <Field title="ISA PRICING">From new raise</Field>
                <Field title="Percentage to be paid">{isa.percentage}%</Field>
                <Field title="Description" className="full">
                  {isa.description}
                </Field>
              </div>

              <IsaAssessment />
            </header>
            <div className="select-plan">
              <h2>Select your payment Plan</h2>
              <div className="plans">
                {PLANS.map((plan, i) => (
                  <div className={`plan${fixClass(plan.name === selected_plan && 'selected')}`} key={i}>
                    <div>
                      <h2>{plan.name}</h2>
                      <p className="plan_price">
                        ${plan.price.toLocaleString()} <span>usd</span>
                      </p>
                      {plan.payments.map((payment, i) => (
                        <p className="upfront_payment" key={i}>
                          <i>{payment.count}</i>
                          {payment.title}
                        </p>
                      ))}

                      <p className="plan_desc">{plan.description}</p>
                    </div>

                    <Button onClick={() => set_selected_plan(plan.name)}>Select Plan</Button>
                  </div>
                ))}
              </div>

              <div className="plan-desc">
                <h2>Combined Plan</h2>
                <div className="plan-carousel">
                  <div className="wrapper">
                    <div>
                      <h2>Upfront Payment</h2>
                      <p className="date">
                        January, <span>2020</span>
                      </p>
                      <p>
                        $3,500 <span>USD</span>
                      </p>
                    </div>
                    <div>
                      <h2>
                        1<i>st</i> <span>split Payment</span>
                      </h2>
                      <p className="date">
                        February, <span>2020</span>
                      </p>
                      <p>
                        $500 <span>USD</span>
                      </p>
                    </div>
                    <div>
                      <h2>
                        2<i>nd</i> <span>split Payment</span>
                      </h2>
                      <p className="date">
                        March, <span>2020</span>
                      </p>
                      <p>
                        $500 <span>USD</span>
                      </p>
                    </div>
                    <div>
                      <h2>
                        3<i>rd</i> <span>split Payment</span>
                      </h2>
                      <p className="date">
                        May, <span>2020</span>
                      </p>
                      <p>
                        $500 <span>USD</span>
                      </p>
                    </div>
                    <div>
                      <h2>
                        4<i>th</i> <span>split Payment</span>
                      </h2>
                      <p className="date">
                        June, <span>2020</span>
                      </p>
                      <p>
                        $500 <span>USD</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="offer-actions">
                  <h2>You can cancel your offer within two weeks of accepting it.</h2>
                  <div className="actions">
                    <Button>DOWNLOAD CONTRACT</Button>
                    <Button>ACCEPT OFFER</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <FAQ />
            <ISACalculator current_income={isa.current_income} percentage={isa.percentage} months={isa.time_to_be_paid} max={100000} />
          </footer>
        </PageContent>
      </article>
    )
  )
}
