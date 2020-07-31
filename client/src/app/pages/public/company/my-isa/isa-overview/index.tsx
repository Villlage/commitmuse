import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../../modules/common/PageHeader'
import PageContent from '../../../../../modules/common/PageContent'
import Field from '../../../../../components/Field'
import Tabs from '../../../../../components/Tabs'
import Status from '../../../../../modules/common/Status'

interface IsaOverviewProps extends ScreenProps {}

export default function IsaOverview(props: IsaOverviewProps) {
  const [active_tab, set_active_tab] = useState('ISA OFFER')
  return (
    <article className="IsaOverview-page">
      <PageHeader user={props.currentUser} />
      <PageContent>
        <h1 className="page-title">Dina Castro</h1>
        <section className="form">
          <Tabs tabs={['overview', 'isa offer']} onChange={tab => set_active_tab(tab)} activeTab={active_tab} />
          {active_tab === 'overview' ? (
            <div className="overview">
              <div>
                <label>Total Paid</label>
                <p>
                  5,000 USD
                  <span>of 25,000 USD</span>
                </p>
              </div>
              <div>
                <label>Total Paid</label>
                <p>
                  1,250 USD
                  <span>August 8th 2020</span>
                </p>
              </div>
              <div>
                <label>Total Paid</label>
                <p>95K / YEAR</p>
              </div>
              <div>
                <label>Total Paid</label>
                <p>
                  125K / YEAR
                  <span>Last verified: August 8th 2020</span>
                </p>
              </div>
            </div>
          ) : (
            <>
              <Status selected="paying" />
              <div className="fields">
                <Field title="company">Amy Owens</Field>
                <Field title="Client">Dina Castro</Field>
                <Field className="full" title="Current Income">
                  $95K / YEAR
                </Field>
                <Field className="full" title="target Income">
                  $125K / YEAR
                </Field>
                <Field className="full" title="Percentage to be paid">
                  17%
                </Field>
                <Field className="full" title="Description">
                  Get a senior PM role
                </Field>
                <Field className="full" title="Cancellation PEriod">
                  2 weeks
                </Field>
              </div>
            </>
          )}
        </section>
      </PageContent>
    </article>
  )
}
