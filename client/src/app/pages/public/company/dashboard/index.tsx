import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import MenuSideBar from '../../../../modules/company/MenuSideBar'

interface CompanyDashboardProps extends ScreenProps {

}

export default function CompanyDashboard(props: CompanyDashboardProps) {
  return (
    <article className="CompanyDashboard-page">
      <PageContent title="Overview">
        <MenuSideBar />
      </PageContent>
    </article>
  )
}