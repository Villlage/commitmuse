import React, { useLayoutEffect, useState } from 'react'
import './syle.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Icon from '../../../../components/Icon'
import Button from '../../../../components/Button'
import PlaidService from '../../../../../services/plaid.service'
import Message from '../../../../components/Message'
import Loader from '../../../../components/Loader'
import CompanyService from '../../../../../services/company.service'

const plaidService = new PlaidService()
const companyService = new CompanyService()

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

interface SubscriptionProps extends ScreenProps {
  match: {
    params: {
      id: string
    }
  }
}

export default function Subscription(props: SubscriptionProps) {
  const [request_error, set_request_error] = useState<any>('')
  const [mask, set_mask] = useState<string | null>('')
  const [loading, set_loading] = useState<boolean>(true)
  const companyId = props.match.params.id

  const getMask = async () => {
    try {
      const res = await plaidService.getMask(companyId)

      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        set_mask(null)
      }
    } catch (e) {
      set_mask(null)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
      return set_loading(false)
    }
  }

  const subscribe = async () => {
    try {
      const res = await companyService.createSubscription(companyId)

      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        set_mask(null)
      }

      if (res && res.is_active) {
        set_request_error({ text: 'Subscription created', type: 'info' })
        return setTimeout(() => props.history.push('/company/dashboard'), 2000)
      }
    } catch (e) {
      set_mask(null)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
      return set_loading(false)
    }
  }

  useLayoutEffect(() => {
    companyId && getMask()
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <article className="Subscription-page">
      <PageContent title="Subscription">
        {mask !== null ? (
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
                  {mask ? (
                    <>
                      <Icon icon="check-circle" />
                      Account ending in {mask}
                    </>
                  ) : (
                    ''
                  )}
                </p>
                {/*hidden for now until we have design for it*/}
                {/*<Button>*/}
                {/*  <Icon icon="blue-plus" />*/}
                {/*  Other Payment Method*/}
                {/*</Button>*/}
              </div>
            </div>
            <footer>
              <Button onClick={() => props.history.push('/company/dashboard')} className="skip">Skip for now</Button>
              <Button disabled={!companyId} onClick={subscribe} className="start" background="MainWarning">
                START MY Subscription
              </Button>
            </footer>
          </section>
        ) : (
          ''
        )}
        <Message message={request_error} />
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
