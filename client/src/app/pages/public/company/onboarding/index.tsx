import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import PageHeader from '../../../../modules/common/PageHeader'
import Stepper from '../../../../modules/common/Stepper'

const on_boarding_steps = [
  'company details',
  'link bank'
]

interface CompanyOnBoardingProps extends ScreenProps {

}

export default function CompanyOnBoarding(props: CompanyOnBoardingProps) {
  const [active_step, set_active_step] = useState(0)
  return (
    <article className="CompanyOnBoarding-page">
      <PageContent>
        <PageHeader user={props.currentUser} />
        <h2>Register</h2>
        <section className="on_boarding-form">
          <Stepper steps={on_boarding_steps} activeIndex={active_step}/>
        </section>
      </PageContent>
    </article>
  )
}