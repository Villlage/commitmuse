import './style.scss'
import React, { CSSProperties } from 'react'
import { fixClass } from '../../../helpers/base'

interface TextAreaProps {
  onChange(e: string): void
  value: string
  placeholder?: string
  className?: string
  rows?: number
  cols?: number
  autoFocus?: boolean
  style?: CSSProperties
}

export default function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className={`TextArea-component${fixClass(props.className)}`}
      style={props.style}
      onChange={e => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      value={props.value}
      rows={props.rows}
      cols={props.cols}
      autoFocus={props.autoFocus}
    />
  )
}
