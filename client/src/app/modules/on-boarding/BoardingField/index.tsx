import React from 'react'
import './style.scss'
import { isNumber } from '../../../../helpers/base'
import TooltipBadge from '../../../components/TooltipBadge'

interface BoardingFieldProps {
  label: string
  value: number
  onChange(e: number): void
  suffix: string
  tooltip: string
}

export default function BoardingField(props: BoardingFieldProps) {
  return (
    <div className="BoardingField-module">
      <div className="label">
        <label>{props.label}</label>
        <TooltipBadge tooltip={props.tooltip} />
      </div>
      <div className="input">
        <input type="text" value={props.value} onChange={e => isNumber(e.target.value) && props.onChange(Number(e.target.value))} />
        <span>{props.suffix}</span>
      </div>
    </div>
  )
}