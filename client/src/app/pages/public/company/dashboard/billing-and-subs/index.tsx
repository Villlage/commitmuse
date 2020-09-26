import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import Icon from '../../../../../components/Icon'
import Message from '../../../../../components/Message'
import PageContent from '../../../../../modules/common/PageContent'
import SubscriptionOffer from '../../../../../modules/company/SubscriptionOffer'
import { OFFERS } from '../../../../../../constants/mockData'
import Loader from '../../../../../components/Loader'
import PlaidService from '../../../../../../services/plaid.service'
import Tabs from '../../../../../components/Tabs'
import Button from '../../../../../components/Button'
import UserService from '../../../../../../services/user.service'
import { fixClass } from '../../../../../../helpers/base'

const plaidService = new PlaidService()
const userService = new UserService()

interface BillingAndSubsProps extends ScreenProps {}

export default function BillingAndSubs(props: BillingAndSubsProps) {
  const [request_error, set_request_error] = useState<any>('')
  const [mask, set_mask] = useState<string | null>('')
  const [loading, set_loading] = useState<boolean>(true)
  const [btn_loading, set_btn_loading] = useState<boolean>(false)
  const [active_tab, set_active_tab] = useState<string>('subscription')

  const companyId = props.currentUser.company

  const getMask = async () => {
    try {
      const res = await plaidService.getMask(companyId)

      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        set_mask(null)
        return setTimeout(() => set_request_error(''), 3000)
      }
    } catch (e) {
      set_mask(null)
      set_request_error(e.error || e.toString())
      set_loading(false)
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const cancel_subscription = async () => {
    try {
      set_btn_loading(true)
      const res = await userService.editUser({ is_active: !props.currentUser.is_active })

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        return setTimeout(() => set_request_error(''), 3000)
      }

      props.setCurrentUser(res)
      set_btn_loading(false)
    } catch (e) {
      set_btn_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const tab_strategy: any = {
    subscription: (
      <>
        <div className="tab">
          <h2 className="tab-title">My Subscription</h2>
          <div className="offer-list">
            {OFFERS.map((offer, i) => (
              <SubscriptionOffer offer={offer} key={i} />
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
            </div>
          </div>
        </div>
        <footer>
          <Button
            onClick={cancel_subscription}
            loading={btn_loading}
            className={fixClass(props.currentUser.is_active && 'active')}
          >
            {props.currentUser.is_active ? 'Cancel Subscription' : 'Activate Subscription'}
          </Button>
        </footer>
      </>
    ),
    billing: '',
    invoices: (
      <section className="tab">
        <h2 className="tab-title">Invoices</h2>
        {/*<Table rows={INVOICES} headers={table_headers} />*/}
      </section>
    ),
  }

  useLayoutEffect(() => {
    companyId ? getMask() : set_loading(false)
  }, [])

  return (
    <article className="BillingAndSubs-page">
      <PageContent title="Billing and Subscription" loading={loading}>
        <section className="billing-info">
          <header>
            <Tabs
              tabs={['subscription', 'billing', 'invoices']}
              onChange={tab => set_active_tab(tab)}
              activeTab={active_tab}
            />
          </header>
          {tab_strategy[active_tab]}
        </section>

        <Message message={request_error} />
      </PageContent>
    </article>
  )
}

/*

const table_headers: Header[] = [
  {
    key: 'date',
    title: 'DATE',
    sortable: true,
  },
  {
    key: 'invoice_number',
    title: 'Invoice Number',
    sortable: true,
  },
  {
    key: 'billing_period',
    title: 'Billing\n' + 'Period',
    sortable: true,

  },
  {
    key: 'amount',
    title: 'Amount',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
  },
]
 */
