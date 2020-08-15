import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import MenuSideBar from '../../../../modules/company/MenuSideBar'
import Icon from '../../../../components/Icon'

interface CompanyDashboardProps extends ScreenProps {}

export default function CompanyDashboard(props: CompanyDashboardProps) {
  return (
    <article className="CompanyDashboard-page">
      <MenuSideBar />
      <PageContent title="Overview">
        <section className="boxes">
          <section className="total">
            <div>
              <h2>Total Revenue</h2>
              <p>5,000 USD</p>
            </div>
            <div>
              <h2>Last Payment</h2>
              <p>
                1,250 USD
                <span>August 8th 2020</span>
              </p>
            </div>
          </section>
          <section className="counts">
            <div>
              <h2>
                8<span>coaches</span>
              </h2>
              <Icon icon="round_blue_user" />
            </div>
            <div>
              <h2>
                16<span>isa offers completed</span>
              </h2>
              <Icon icon="round_blue_doc" />
            </div>
            <div>
              <h2>
                64<span>active Clients</span>
              </h2>
              <Icon icon="round_blue_user" />
            </div>
            <div>
              <h2>
                32<span>isa offers In Progress</span>
              </h2>
              <Icon icon="round_blue_doc" />
            </div>
          </section>
        </section>
      </PageContent>
    </article>
  )
}