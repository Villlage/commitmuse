import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../modules/common/PageHeader'
import PageContent from '../../../../modules/common/PageContent'
import FAQ from '../../../../modules/company/CreateIsa/FAQ'
import IsaOfferReview from '../../../../modules/client/IsaOfferReview'

interface ClientIsaOfferProps extends ScreenProps {}

export default function ClientIsaOffer(props: ClientIsaOfferProps) {
  return (
    <article className="ClientIsaOffer-page">
      <PageHeader />
      <PageContent>
        <section className="offer-steps">
          <IsaOfferReview/>
        </section>
        <FAQ />
      </PageContent>
    </article>
  )
}