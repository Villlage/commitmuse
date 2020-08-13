import React from 'react'
import './syle.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import PageHeader from '../../../../modules/common/PageHeader'
import Icon from '../../../../components/Icon'
import Button from '../../../../components/Button'

interface Offer {
  title: string
  description: string
  oldCost: number
  cost: number
}

const offers: Offer[] = [
  {
    title: 'Monthly Suscription',
    description: 'Complete access to Commit Muse',
    oldCost: 50,
    cost: 30,
  },
  {
    title: 'Client Fee',
    description: 'Per active ISA student, each month',
    oldCost: 8,
    cost: 2,
  },
]

interface SubscriptionProps extends ScreenProps {}

export default function Subscription(props: SubscriptionProps) {
  return (
    <article className="Subscription-page">
      <PageHeader user={props.currentUser} />

      <PageContent title="Subscription">
        <section className="subscription-offer">
          <h2>Early adopter Discount offer:</h2>
          <div className="offer-list">
            {offers.map((offer, i) => (
              <Offer offer={offer} key={i} />
            ))}
          </div>
          <div className="payment-method">
            <h2>Payment method</h2>
            <div>
              <p>
                <Icon icon="check-circle" />
                Account ending in 1234
              </p>
              <Button>
                <Icon icon="blue-plus" />
                Other Payment Method
              </Button>
            </div>
          </div>
          <footer>
            <Button className="skip">Skip for now</Button>
            <Button className="start" background="MainWarning">START MY Subscription</Button>
          </footer>
        </section>
      </PageContent>
    </article>
  )
}

function Offer({ offer }: { offer: Offer }) {
  return (
    <div className="offer">
      <div className="description">
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
      </div>
      <div className="cost">
        <h2>${offer.oldCost}</h2>
        <p>${offer.cost}</p>
      </div>
    </div>
  )
}