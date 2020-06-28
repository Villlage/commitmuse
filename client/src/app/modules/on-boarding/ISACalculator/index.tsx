import React from 'react'
import './style.scss'
import Icon from '../../../components/Icon'

interface ISACalculatorProps {
  current_income: number
  future_income: number
  incomeChange(e: number): void
  futureChange(e: number): void
}

export default function ISACalculator(props: ISACalculatorProps) {
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
              <p>${props.current_income}K / YEAR</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2>future income</h2>
              <p>${props.future_income}K / YEAR</p>
            </div>
          </div>

          <section className="slider">
            <input onChange={e => props.incomeChange(Number(e.target.value))} className="line" value={props.current_income} min={0} max={100} step={1} type="range" />
            <input onChange={e => props.futureChange(Number(e.target.value))} className="line" id="future_amount" value={props.future_income} min={100} max={200} step={1} type="range" />
          </section>

          <div className="future-bill">
            <label>Future Bill</label>
            <p>$41.25K / YEAR (17%)</p>
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