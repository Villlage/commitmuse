import React, { useState } from 'react'
import './style.scss'
import { PlaidMetadata, ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../../modules/common/PageHeader'
import PageContent from '../../../../../modules/common/PageContent'
import FAQ from '../../../../../modules/company/CreateIsa/FAQ'
import IsaOfferReview from '../../../../../modules/client/IsaOfferReview'
import OfferStatus from '../../../../../modules/client/OfferStatus'
import ClientIsaSignUp from '../sign-up'
import { usePlaidLink } from 'react-plaid-link'
import PlaidService from '../../../../../../services/plaid.service'
import Message from '../../../../../components/Message'

const plaidService = new PlaidService()
const offerStatuses = ['review offer', 'sign up', 'link bank', 'sign contract']

interface ClientIsaOfferProps extends ScreenProps {}

export default function ClientIsaOffer(props: ClientIsaOfferProps) {
  const [offer_step, set_offer_step] = useState(0)
  const [request_error, set_request_error] = useState('')

  const onSuccess = async (token: string, metadata: PlaidMetadata) => {
    try {
      const res = true ? {} : await plaidService.createItem(token, metadata)

      if (res) {
        if (res.error) {
          set_request_error(res.error)
          setTimeout(() => set_request_error(''), 3000)
        } else {
          set_offer_step(offer_step + 1)
        }
      }
    } catch (e) {
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const config = {
    clientName: 'Commit Muse',
    env: 'sandbox',
    product: ['auth', 'transactions'],
    publicKey: 'a004a070f0629da694fbae916414f3',
    onSuccess: onSuccess,
  }

  const { open, ready, error } = usePlaidLink(config)

  const offer_strategy: any = {
    'review offer': (
      <IsaOfferReview
        onNext={() => {
          set_offer_step(offer_step + 1)
        }}
      />
    ),
    'sign up': (
      <ClientIsaSignUp
        onNext={() => {
          set_offer_step(offer_step + 1)
          open()
        }}
      />
    ),
    'link bank': (
      <ClientIsaSignUp
        onNext={() => {
          set_offer_step(offer_step + 1)
        }}
      />
    ),
    'sign contract': (
      <ClientIsaSignUp
        onNext={() => {
          set_offer_step(offer_step + 1)
          open()
        }}
      />
    ),
  }

  return (
    <article className="ClientIsaOffer-page">
      <PageHeader />
      <PageContent>
        <section className="offer-steps">
          <OfferStatus statuses={offerStatuses} activeIndex={offer_step} />
          {offer_strategy[offerStatuses[offer_step]]}
        </section>
        <FAQ />
      </PageContent>
      <Message message={request_error} />
    </article>
  )
}