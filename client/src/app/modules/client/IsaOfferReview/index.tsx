import React from 'react'
import './style.scss'
import Field from '../../../components/Field'
import IsaAssessment from '../../common/IsaAssessment'
import Icon from '../../../components/Icon'
import Button from '../../../components/Button'
import { makeName } from '../../../../helpers/base'

interface IsaOfferReviewProps {
  isa: any
  onNext(): void
}

export default function IsaOfferReview(props: IsaOfferReviewProps) {
  return (
    <section className="client-isa_offer_review">
      <div className="fields">
        <Field title="company">{makeName(props.isa.coach)}</Field>
        <Field title="Client">{makeName(props.isa.student)}</Field>
        <Field className="full" title="Current Income">
          ${props.isa.current_income}
        </Field>
        <Field className="full" title="Maximum to be paid">
          ${props.isa.cap}
        </Field>
        <Field className="full" title="Percentage to be paid">
          {props.isa.percentage}%
        </Field>
        <Field className="full" title="Description">
          {props.isa.description}
        </Field>
        <Field className="full" title="Cancellation Period">
          {props.isa.cancellation_period_weeks ? props.isa.cancellation_period_weeks + ' weeks' : '-'}
        </Field>
        <Field className="full" title="Time to be paid">
          {props.isa.time_to_be_paid ? props.isa.time_to_be_paid + ' month(s)' : '-'}
        </Field>
        <IsaAssessment className="full" />
      </div>
      <footer>
        <a href="#">
          <Icon icon="file-download" />
          DOWNLOAD CONTRACT
        </a>
        <Button background="MainWarning" onClick={props.onNext}>
          ACCEPT OFFER
        </Button>
      </footer>
    </section>
  )
}