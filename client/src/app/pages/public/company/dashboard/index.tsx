import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'

interface CompanyDashboardProps extends ScreenProps {

}


export default function CompanyDashboard(props: CompanyDashboardProps) {

  return (
    <article className="CompanyDashboard-page">
      <h2>CompanyDashboard</h2>
    </article>
  )
}