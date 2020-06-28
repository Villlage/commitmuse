import React, { useState } from 'react'
import './style.scss'
import Icon from '../../../components/Icon'

interface ISACalculatorProps {
  percentage: number
  months: number
  max: number
}

export default function ISACalculator(props: ISACalculatorProps) {
  const [current_income, set_current_income] = useState(95)
  const [future_income, set_future_income] = useState(125)

  const feature_bill = () => {
    let bill = (props.percentage / 100) * future_income * (props.months / 12)

    if (future_income > props.max) {
      bill = props.max
    }

    if (bill < current_income) {
      bill = 0
    }

    return Math.round(bill)
  }

  return (
    <section className="ISACalculator-module">
      <header>
        <h2>ISA Calculator</h2>
      </header>

      <div className="body">
        <div className="slider-wrapper">
          <div className="titles">
            <div>
              <h2>current income</h2>
              <p>${current_income}K / YEAR</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2>future income</h2>
              <p>${future_income}K / YEAR</p>
            </div>
          </div>

          <section className="slider">
            <input onChange={e => set_current_income(Number(e.target.value))} className="line" value={current_income} min={0} max={200} step={1} type="range" />
            <input onChange={e => set_future_income(Number(e.target.value))} className="line" id="future_amount" value={future_income} min={0} max={200} step={1} type="range" />
          </section>

          <div className="future-bill">
            <label>Future Bill</label>
            <p>${feature_bill()}K / YEAR ({props.percentage}%)</p>
          </div>
        </div>
      </div>
      <footer>
        <p>Embed this calculator in your website:</p>
        <button>
          <Icon icon="code" />
          copy code
        </button>
      </footer>
    </section>
  )
}