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
            <div style={{textAlign: 'right'}}>
              <h2>future income</h2>
              <p>${props.future_income}K / YEAR</p>
            </div>
          </div>

          <Slider
              min={props.current_income}
              max={props.future_income}
              onMinChange={e => props.incomeChange(e)}
              onMaxChange={e => props.futureChange(e)}
            />
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

interface SliderProps {
  min: number
  max: number
  onMinChange(e: number): void
  onMaxChange(e: number): void
}

function Slider(props: SliderProps) {
  return (
    <section className="Slider-component">
      <div className="wrapper">
        <span className="left_dot" />
        <span className="line" />
        <span className="right_dot" />
      </div>
    </section>
  )
}