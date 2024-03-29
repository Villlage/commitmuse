import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { PlaidMetadata, ScreenProps } from '../../../../../interfaces/baseIntefaces'
import currentEnv from '../../../../../config/environment'
import { usePlaidLink } from 'react-plaid-link'
import IsaOfferReview from '../../../../modules/client/IsaOfferReview'
import ClientIsaSignUp from './sign-up'
import Button from '../../../../components/Button'
import PageContent from '../../../../modules/common/PageContent'
import Stepper from '../../../../modules/common/Stepper'
import ISACalculator from '../../../../modules/on-boarding/ISACalculator'
import FAQ from '../../../../modules/company/CreateIsa/FAQ'
import Message from '../../../../components/Message'
import PlaidService from '../../../../../services/plaid.service'
import ClientService from '../../../../../services/client.service'

const plaidService = new PlaidService()
const clientService = new ClientService()
const offerStatuses = ['review offer', 'sign up', 'link bank', 'sign contract']

interface ClientIsaOfferSigningProps extends ScreenProps {
  match: any
}

export default function ClientIsaOfferSigning(props: ClientIsaOfferSigningProps) {
  const [isa, set_isa] = useState<any>(null)
  const [offer_step, set_offer_step] = useState(0)
  const [request_error, set_request_error] = useState('')

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
    'review offer': (
      <IsaOfferReview
        isa={isa}
        onNext={() => {
          set_offer_step(offer_step + 1)
        }}
      />
    ),
    'sign up': isa && (
      <ClientIsaSignUp
        email={isa.student.email}
        user_id={isa.student.id.toString()}
        onNext={handleSignUp}
        token={token}
      />
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
    <article className="ClientIsaOfferSigning-page">
      <PageContent>
        <section className="offer-steps">
          <Stepper steps={offerStatuses} activeIndex={offer_step} />
          {isa && offer_strategy[offerStatuses[offer_step]]}
        </section>

        {isa && (
          <section>
            <ISACalculator
              current_income={isa.current_income}
              percentage={isa.percentage}
              months={isa.time_to_be_paid}
              max={isa.cap}
            />
            <FAQ />
          </section>
        )}
      </PageContent>
      <Message message={request_error} />
    </article>
  )
}
