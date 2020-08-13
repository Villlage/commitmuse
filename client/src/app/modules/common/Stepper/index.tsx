import React from 'react'
import './style.scss'
import { fixClass } from '../../../../helpers/base'
import styled from 'styled-components'

const Steps = styled.section<any>`
  grid-template-columns: ${props => new Array(props.length).fill('1fr ').join('')};
`

interface StepperProps {
  steps: Array<string>
  activeIndex: number
}

export default function Stepper(props: StepperProps) {
  return (
    <Steps length={props.steps.length} className="Stepper-module">
      {props.steps.map((step, i) => (
        <div
          className={`status${fixClass(i === props.activeIndex && 'selected')}`}
          key={i}
        >
          {step}
        </div>
      ))}
    </Steps>
  )
}