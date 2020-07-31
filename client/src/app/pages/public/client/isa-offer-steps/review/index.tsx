import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../../modules/common/PageHeader'
import PageContent from '../../../../../modules/common/PageContent'
import FAQ from '../../../../../modules/company/CreateIsa/FAQ'
import IsaOfferReview from '../../../../../modules/client/IsaOfferReview'
import OfferStatus from '../../../../../modules/client/OfferStatus'

const offerStatuses = ['review offer', 'sign up', 'sign contract', 'link bank']

interface ClientIsaOfferProps extends ScreenProps {}

export default function ClientIsaOffer(props: ClientIsaOfferProps) {
  const [offer_step, set_offer_step] = useState(offerStatuses[0])

  const offer_strategy: any = {
    'review offer': <IsaOfferReview />,
    'sign up': <h2>This is sign up step</h2>,
    'sign contract': <IsaOfferReview />,
    'link bank': <IsaOfferReview />,
  }

  return (
    <article className="ClientIsaOffer-page">
      <PageHeader />
      <PageContent>
        <section className="offer-steps">
          <OfferStatus statuses={offerStatuses} selected={offer_step} />
          {offer_strategy[offer_step]}
        </section>
        <FAQ />
      </PageContent>
    </article>
  )
}