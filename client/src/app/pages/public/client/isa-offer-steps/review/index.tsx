import React, { useLayoutEffect, useState } from 'react'
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
import Button from '../../../../../components/Button'
import ClientService from '../../../../../../services/client.service'

const plaidService = new PlaidService()
const clientService = new ClientService()
const offerStatuses = ['review offer', 'sign up', 'link bank', 'sign contract']

interface ClientIsaOfferProps extends ScreenProps {
  match: any
}

export default function ClientIsaOffer(props: ClientIsaOfferProps) {
  const [isa, set_isa] = useState<any>(null)
  const [offer_step, set_offer_step] = useState(0)
  const [request_error, set_request_error] = useState('')

  const isa_id = props.match.params.id

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
          props.history.push(`/isa/${res.id || 1}`)
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
    env: 'sandbox',
    product: ['auth', 'transactions'],
    publicKey: 'a004a070f0629da694fbae916414f3',
    onSuccess: onSuccess,
  }

  const { open, ready, error } = usePlaidLink(config)
  const offer_strategy: any = isa && {
    'review offer': (
      <IsaOfferReview
        isa={isa}
        onNext={() => {
          set_offer_step(offer_step + 1)
        }}
      />
    ),
    'sign up': isa && <ClientIsaSignUp email={isa.student.email} user_id={isa.student.id.toString()} onNext={handleSignUp} />,
    'link bank': (
      <section className="link_bank">
        <Button background="MainWarning" onClick={() => open()}>
          Link Bank
        </Button>
      </section>
    ),
  }

  return (
    <article className="ClientIsaOffer-page">
      <PageHeader />
      <PageContent>
        <section className="offer-steps">
          <OfferStatus statuses={offerStatuses} activeIndex={offer_step} />
          {isa && offer_strategy[offerStatuses[offer_step]]}
        </section>
        <FAQ maximum={10000} months={7} percentage={1} current_income={80000} />
      </PageContent>
      <Message message={request_error} />
    </article>
  )
}