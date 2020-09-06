import './style.scss'
import React, { useState } from 'react'
import { IsaClient, IsaProgram, ScreenProps } from '../../../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../../../modules/common/PageContent'
import IsaService from '../../../../../../../services/isa.service'
import Message from '../../../../../../components/Message'
import Stepper from '../../../../../../modules/common/Stepper'
import ClientStep from '../../../../../../modules/company/CreateIsa/ClientStep'
import ProgramStep from '../../../../../../modules/company/CreateIsa/ProgramStep'
import IsaOfferStep from '../../../../../../modules/company/CreateIsa/IsaOfferStep'
import ReviewStep from '../../../../../../modules/company/CreateIsa/ReviewStep'
import ContractStep from '../../../../../../modules/company/CreateIsa/ContractStep/ContractStep'
import ISACalculator from '../../../../../../modules/on-boarding/ISACalculator'
import FAQ from '../../../../../../modules/company/CreateIsa/FAQ'
import Icon from '../../../../../../components/Icon'

const isaService = new IsaService()

const OFFER_STEPS = ['client', 'program', 'isa offer', 'review', 'contract']

interface CreateIsaProps extends ScreenProps {}

export default function CompanyCreateIsa(props: CreateIsaProps) {
  const [request_error, set_request_error] = useState('')
  const [active_step, set_active_step] = useState(0)

  const [client, set_client] = useState<IsaClient>({
    email: '',
    first_name: '',
    last_name: '',
  })

  const [program, set_program] = useState<IsaProgram>({
    field: '',
    duration: '',
    description: '',
  })

  const [offer, set_offer] = useState({
    type: 'From total income',
  })

  const [total_income, set_total_income] = useState({
    percentage: '17',
    time_to_be_paid: '2',
    cap: '10000',
    cancellation_period: '2',
    expiration_period_months: '2',
    risk: '20',
    current_income: '80000',
  })

  const sendOffer = async () => {
    try {
      const res = await isaService.create({
        current_income: removeComma(total_income.current_income),
        percentage: Number(total_income.percentage),
        cap: removeComma(total_income.cap),
        cancellation_period_weeks: Number(total_income.cancellation_period),
        time_to_be_paid: Number(total_income.time_to_be_paid),
        description: program.description,
        client,
        coach_id: props.currentUser.id,
        industry_field: program.field,
        program_duration_weeks: program.duration,
        status: 'created',
        expiration_period_months: total_income.expiration_period_months,
      })

      if (res && res.error) {
        set_request_error(res.error)
        return setTimeout(() => set_request_error(''), 3000)
      }

      set_active_step(active_step + 1)
      return props.history.push(`/company/isas/contract/${res.id}`)
    } catch (e) {
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const removeComma = (str: string) => {
    return Number(str.replace(/,/g, ''))
  }

  const offer_step_strategy: any = {
    client: (
      <ClientStep
        client={client}
        onChange={(e, key) => set_client({ ...client, [key]: e })}
        onNext={() => set_active_step(active_step + 1)}
      />
    ),
    program: (
      <ProgramStep
        onChange={(e, key) => set_program({ ...program, [key]: e })}
        onNext={() => set_active_step(active_step + 1)}
        program={program}
      />
    ),
    'isa offer': (
      <IsaOfferStep
        offer={offer}
        onChange={(e, key) => set_offer({ ...offer, [key]: e })}
        onNext={() => set_active_step(active_step + 1)}
      />
    ),
    review: (
      <ReviewStep
        client={client}
        program={program}
        offer={offer}
        total_income={total_income}
        onChange={(e, key) => set_total_income({ ...total_income, [key]: e })}
        onNext={async () => await sendOffer()}
      />
    ),
    contract: <ContractStep onNext={() => null} />,
  }

  return (
    <article className="CompanyCreateIsa-page">
      <PageContent>
        <h1 className="page-title">
          {active_step !== 0 && <Icon onClick={() => set_active_step(active_step - 1)} icon="arrow-left" />} New ISA
          Offer
        </h1>
        <section className="container">
          <section className="offer-steps">
            <Stepper steps={OFFER_STEPS} activeIndex={active_step} />
            {offer_step_strategy[OFFER_STEPS[active_step]]}
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
