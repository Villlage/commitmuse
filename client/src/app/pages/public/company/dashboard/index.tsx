import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import MenuSideBar from '../../../../modules/company/MenuSideBar'
import Icon from '../../../../components/Icon'
import Loader from '../../../../components/Loader'
import CompanyService from '../../../../../services/company.service'
import { formatDate } from '../../../../../helpers/formattings'

const companyService = new CompanyService()

interface CompanyDashboardProps extends ScreenProps {}

export default function CompanyDashboard(props: CompanyDashboardProps) {
  const [request_error, set_request_error] = useState<any>('')
  const [loading, set_loading] = useState<boolean>(true)
  const [data, set_data] = useState({
    coaches: null,
    isas: null,
    last_payment: { date: null, value: null },
    total_revenue: null,
  })

  const setData = async () => {
    try {
      const res = await companyService.overview(props.currentUser.company)
      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        return setTimeout(() => set_request_error(''), 3000)
      }

      set_data(res)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    setData()
  }, [])

  return (
    <article className="CompanyDashboard-page">
      <PageContent title="Overview" error={request_error} loading={loading}>
        <section className="boxes">
          <section className="total">
            <div>
              <h2>Total Revenue</h2>
              <p>{data.total_revenue} USD</p>
            </div>
            <div>
              <h2>Last Payment</h2>
              <p>
                {data.last_payment.value} USD
                <span>{data.last_payment.date ? formatDate(data.last_payment.date as any) : '-/-/-'}</span>
              </p>
            </div>
          </section>
          <section className="counts">
            <div>
              <h2>
                {data.coaches}
                <span>coaches</span>
              </h2>
              <Icon icon="round_blue_user" />
            </div>
            <div>
              <h2>
                - <span>isa offers completed</span>
              </h2>
              <Icon icon="round_blue_doc" />
            </div>
            <div>
              <h2>
                - <span>active Clients</span>
              </h2>
              <Icon icon="round_blue_user" />
            </div>
            <div>
              <h2>
                - <span>isa offers In Progress</span>
              </h2>
              <Icon icon="round_blue_doc" />
            </div>
          </section>
        </section>
      </PageContent>
    </article>
  )
}
