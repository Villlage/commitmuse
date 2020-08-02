import React from 'react'
import './style.scss'
import Field from '../../../components/Field'
import IsaAssessment from '../../common/IsaAssessment'
import Icon from '../../../components/Icon'
import Button from '../../../components/Button'

interface IsaOfferReviewProps {
  isa: any
  onNext(): void
}

export default function IsaOfferReview(props: IsaOfferReviewProps) {
  return (
    <section className="client-isa_offer_review">
      <div className="fields">
        <Field title="company">Amy Owens</Field>
        <Field title="Client">Dina Castro</Field>
        <Field className="full" title="Current Income">
          ${props.isa.current_income} / YEAR
        </Field>
        <Field className="full" title="Previous Income">
          ${props.isa.current_income} / YEAR
        </Field>
        <Field className="full" title="Percentage to be paid">
          {props.isa.percentage}%
        </Field>
        <Field className="full" title="Description">
          Get a senior PM role
        </Field>
        <Field className="full" title="Cancellation PEriod">
          {props.isa.cancellation_period_weeks} weeks
        </Field>
        <IsaAssessment className="full"/>
      </div>
      <footer>
        <a href="#">
          <Icon icon="file-download"/>
          DOWNLOAD CONTRACT
        </a>
        <Button background="MainWarning" onClick={props.onNext}>ACCEPT OFFER</Button>
      </footer>
    </section>
  )
}