import React, { useState } from 'react'
import PageContent from '../../../../../../../modules/common/PageContent'
import Stepper from '../../../../../../../modules/common/Stepper'
import FAQ from '../../../../../../../modules/company/CreateIsa/FAQ'
import Message from '../../../../../../../components/Message'
import ContractStep from '../../../../../../../modules/company/CreateIsa/ContractStep/ContractStep'
import IsaService from '../../../../../../../../services/isa.service'

const isaService = new IsaService()

const OFFER_STEPS = ['client', 'program', 'isa offer', 'review', 'contract']

interface SignContractProps {
  match: any
  location: Location
}

export default function SignContract(props: SignContractProps) {
  const [request_error, set_request_error] = useState('')

  const onSign = async () => {
    try {
      await isaService.docusignLogin(props.match.params.id)
      const res = await isaService.signIsa(props.match.params.id)
      if (res && res.error) {
        set_request_error(res.error)
        return setTimeout(() => set_request_error(''), 3000)
      }

      if (res) {
        return (window.location.href = res.url)
      }
    } catch (e) {
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  return (
    <article className="CompanyCreateIsa-page">
      <PageContent>
        <h1 className="page-title">New ISA Offer</h1>
        <section className="container">
          <section className="offer-steps">
            <Stepper steps={OFFER_STEPS} activeIndex={4} />
            <ContractStep onNext={onSign} />
          </section>
          <section className="faq-and-calc">
            {/*<ISACalculator*/}
            {/*  current_income={removeComma(total_income.current_income)}*/}
            {/*  percentage={Number(total_income.percentage)}*/}
            {/*  months={Number(total_income.time_to_be_paid)}*/}
            {/*  max={removeComma(total_income.cap)}*/}
            {/*/>*/}
            <FAQ />
          </section>
        </section>
      </PageContent>
      <Message message={request_error} />
    </article>
  )
}
