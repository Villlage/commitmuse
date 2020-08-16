import React from 'react'
import { fixClass } from '../../../helpers/base'
import './style.scss'
import styled from 'styled-components'

const Options = styled.section<any>`
  display: grid;
  grid-template-columns: ${props => new Array(props.length).fill('1fr ').join('')};
`

interface ButtonSelectProps {
  options: string[]
  selected: string
  onSelect(option: string): void
}

export default function ButtonSelect(props: ButtonSelectProps) {
  return (
    <Options length={props.options.length} className="ButtonSelect-component">
      {props.options.map((option, i) => (
        <div
          onClick={() => props.onSelect(option)}
          className={`option${fixClass(option === props.selected && 'selected')}`}
          key={i}
        >
          {option}
        </div>
      ))}
    </Options>
  )
}
