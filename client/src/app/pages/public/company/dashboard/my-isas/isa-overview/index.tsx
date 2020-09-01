import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../../interfaces/baseIntefaces'
import { makeName } from '../../../../../../../helpers/base'
import PageContent from '../../../../../../modules/common/PageContent'
import Field from '../../../../../../components/Field'
import Tabs from '../../../../../../components/Tabs'
import Status from '../../../../../../modules/common/Status'
import IsaService from '../../../../../../../services/isa.service'
import Loader from '../../../../../../components/Loader'
import Message from '../../../../../../components/Message'
import MenuSideBar from '../../../../../../modules/company/MenuSideBar'

interface IsaOverviewProps extends ScreenProps {
  match: any
}

const isaService = new IsaService()

export default function CompanyIsaOverview(props: IsaOverviewProps) {
  const [isa, set_isa] = useState<any>([])
  const [active_tab, set_active_tab] = useState('ISA OFFER')
  const [request_error, set_request_error] = useState('')
  const [loading, set_loading] = useState(true)

  const isa_id = props.match.params.id

  const fetchIsa = async () => {
    set_loading(true)
    try {
      const res = await isaService.getIsaById(isa_id)

      if (res.error) {
        set_loading(false)
        set_request_error(res.error)
        return setTimeout(() => set_request_error(''), 3000)
      }

      set_isa(res)
      set_loading(false)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    fetchIsa()
  }, [])

  return (
    <article className="CompanyIsaOverview-page">
      {loading ? (
        <Loader />
      ) : (
        isa && (
          <PageContent>
            <h1 className="page-title">{makeName(isa.student)}</h1>
            <section className="form">
              <Tabs tabs={['overview', 'isa offer']} onChange={tab => set_active_tab(tab)} activeTab={active_tab} />
              {active_tab === 'overview' ? (
                <div className="overview">
                  <div>
                    <label>Total Paid</label>
                    <p>
                      0 USD
                      <span>of {isa.cap} USD</span>
                    </p>
                  </div>
                  <div>
                    <label>Last Payment</label>
                    <p>
                      {/*1,250 USD*/}
                      {/*<span>August 8th 2020</span>*/}
                      N/A
                    </p>
                  </div>
                  <div>
                    <label>Current Income</label>
                    {/*<p>95K / YEAR</p>*/}
                    <p>${isa.current_income} / YEAR</p>
                  </div>
                  <div>
                    <label>Previous Income</label>
                    {/*<p>95K / YEAR</p>*/}
                    <p>${isa.current_income} / YEAR</p>
                  </div>
                </div>
              ) : (
                <>
                  <Status selected={isa.status} />
                  <div className="fields">
                    <Field title="company">{makeName(props.currentUser)}</Field>
                    <Field title="Client">{makeName(isa.student)}</Field>
                    <Field className="full" title="Current Income">
                      ${isa.current_income} / YEAR
                    </Field>
                    <Field className="full" title="time to be paid">
                      {isa.time_to_be_paid || '-'} Month(s)
                    </Field>
                    <Field className="full" title="Percentage to be paid">
                      {isa.percentage || '-'}%
                    </Field>
                    <Field className="full" title="Description">
                      {isa.description || '-'}
                    </Field>
                    <Field className="full" title="Cancellation Period">
                      {isa.cancellation_period_weeks || '-'} Week(s)
                    </Field>
                  </div>
                </>
              )}
            </section>
            <Message message={request_error} />
          </PageContent>
        )
      )}
    </article>
  )
}
