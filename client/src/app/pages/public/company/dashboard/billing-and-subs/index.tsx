import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import Icon from '../../../../../components/Icon'
import Message from '../../../../../components/Message'
import PageContent from '../../../../../modules/common/PageContent'
import SubscriptionOffer from '../../../../../modules/company/SubscriptionOffer'
import { INVOICES, OFFERS } from '../../../../../../constants/mockData'
import Loader from '../../../../../components/Loader'
import PlaidService from '../../../../../../services/plaid.service'
import MenuSideBar from '../../../../../modules/company/MenuSideBar'
import Tabs from '../../../../../components/Tabs'
import Table, { Header } from '../../../../../components/Table'
import Button from '../../../../../components/Button'

const plaidService = new PlaidService()

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

interface BillingAndSubsProps extends ScreenProps {}

export default function BillingAndSubs(props: BillingAndSubsProps) {
  const [request_error, set_request_error] = useState<any>('')
  const [mask, set_mask] = useState<string | null>('')
  const [loading, set_loading] = useState<boolean>(true)
  const [active_tab, set_active_tab] = useState<string>('subscription')

  const companyId = props.currentUser.company

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
      set_loading(false)
      setTimeout(() => set_request_error(''), 3000)
      return set_loading(false)
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
          <button>Cancel Subscription</button>
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

  return loading ? (
    <Loader />
  ) : (
    <article className="BillingAndSubs-page">
      <MenuSideBar />
      <PageContent title="Billing and Subscription">
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
