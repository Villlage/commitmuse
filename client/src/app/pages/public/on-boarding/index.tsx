import React, { useState } from 'react'
import './style.scss'
import Icon from '../../../components/Icon'
import { ScreenProps } from '../../../../interfaces/baseIntefaces'
import BoardingField from '../../../modules/on-boarding/BoardingField'
import TooltipBadge from '../../../components/TooltipBadge'
import PageHeader from '../../../modules/common/PageHeader'
import ISACalculator from '../../../modules/on-boarding/ISACalculator'

interface OnBoardingProps extends ScreenProps {}

const tooltip = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'

export default function OnBoarding(props: OnBoardingProps) {
  const [pricing, set_pricing] = useState<'total' | 'raise'>('total')
  const [percentage, set_percentage] = useState(17)
  const [risk_assessment, set_risk_assessment] = useState(20)
  const [pay_time, set_pay_time] = useState(7)
  const [pay_maximum, set_pay_maximum] = useState(10000)
  return (
    <article className="OnBoarding-page">
      <PageHeader user={props.currentUser} />
      <section className="content">
        <section className="form_wrapper">
          <header>
            <h1>
              {props.currentUser.first_name} {props.currentUser.last_name}
            </h1>
            <h2>Hourly Rate {props.currentUser.hourly_rate} USD</h2>
            <Icon icon="pencil" />
          </header>
          <footer>
            <div className="pricing">
              <TooltipBadge label="Pricing" tooltip={tooltip} />
              <div className="selects">
                <button onClick={() => set_pricing('total')} className={pricing === 'total' ? 'active' : ''}>
                  From total income
                </button>
                <button onClick={() => set_pricing('raise')} className={pricing !== 'total' ? 'active' : ''}>
                  From new raise
                </button>
              </div>
            </div>
            <div className="fields percents">
              <BoardingField
                label="Percentage to be Paid"
                value={percentage}
                onChange={e => set_percentage(e)}
                tooltip={tooltip}
                suffix="%"
              />
              <BoardingField
                label="Risk assessment"
                value={risk_assessment}
                onChange={e => set_risk_assessment(e)}
                tooltip={tooltip}
                suffix="%"
              />
            </div>
            <div className="fields amount">
              <BoardingField
                tooltip={tooltip}
                label="Time to be paid"
                value={pay_time}
                onChange={e => set_pay_time(e)}
                suffix="Months"
              />
              <BoardingField
                tooltip={tooltip}
                label="MAXIMUM TO BE PAID"
                value={pay_maximum}
                onChange={e => set_pay_maximum(e)}
                suffix="USD"
              />
            </div>

            <section className="message">
              <TooltipBadge label="Isa assessment" tooltip={tooltip} />
              <h2>This ISA looks good!</h2>
            </section>
          </footer>
        </section>
        <ISACalculator
          percentage={percentage}
          months={pay_time}
          max={pay_maximum}
        />
      </section>
    </article>
  )
}
