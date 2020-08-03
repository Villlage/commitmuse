import React, { useEffect, useState } from 'react'
import './style.scss'
import Icon from '../../../components/Icon'
import { embedCalculator, roundK } from '../../../../helpers/base'
import Message from '../../../components/Message'
import { SYSTEM_COLORS } from '../../../../constants/system'

interface ISACalculatorProps {
  current_income: number
  percentage: number
  months: number
  max: number
}

export default function ISACalculator(props: ISACalculatorProps) {
  const [copied_to_clipboard, set_copied_to_clipboard] = useState(false)
  const [current_income, set_current_income] = useState(props.current_income)
  const [future_income, set_future_income] = useState(125)

  useEffect(() => {
    set_current_income(props.current_income / 1000)
  }, [props.current_income])

  const future_bill = () => {
    let bill = ((props.percentage / 100) * future_income) * (props.months / 12)

    if (future_income > props.max) {
      bill = props.max
    }

    if (bill > current_income) {
      bill = 0
    }

    if (future_income < current_income) {
      bill = 0
    }

    return Math.round(bill)
  }

  const handleCopy = () => {
    embedCalculator(props.percentage, props.months, props.max, current_income, future_income)
    set_copied_to_clipboard(true)
    return setTimeout(() => set_copied_to_clipboard(false), 2000)
  }

  return (
    <section className="ISACalculator-module">
      <header>
        <h2>ISA CALCULATOR</h2>
      </header>

      <div className="body">
        <div className="slider-wrapper">
          <div className="titles">
            <div>
              <h2>current income</h2>
              <p>${roundK(current_income)}K / YEAR</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2>future income</h2>
              <p>${roundK(future_income)}K / YEAR</p>
            </div>
          </div>

          <section className="slider">
            <input onChange={e => set_current_income(Number(e.target.value))} className="line" value={current_income} min={0} max={200} step={1} type="range" />
            <input onChange={e => set_future_income(Number(e.target.value))} className="line" id="future_amount" value={future_income} min={0} max={200} step={1} type="range" />
          </section>

          <div className="future-bill">
            <label>Future Bill</label>
            <p>${roundK(future_bill())}K ({props.percentage}%)</p>
          </div>
        </div>
      </div>
      <footer>
        <p>Embed this calculator in your website:</p>
        <button onClick={handleCopy}>
          <Icon icon="code" />
          copy code
        </button>
      </footer>
      {copied_to_clipboard && <Message message="Copied to clipboard!" background={SYSTEM_COLORS.MainSuccess} />}
    </section>
  )
}