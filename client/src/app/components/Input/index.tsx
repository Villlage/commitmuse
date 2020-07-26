import './style.scss'
import React, { CSSProperties } from 'react'
import { fixClass } from '../../../helpers/base'

interface InputProps {
  onChange(e: string): void
  value: string
  placeholder?: string
  error?: string
  className?: string
  style?: CSSProperties
  type?: string
  disabled?: boolean
}

export default function Input(props: InputProps) {
  return (
    <div  className={`Input-component${fixClass(props.className)}`}>
      <input
        disabled={props.disabled}
        type={props.type || 'text'}
        onChange={e => props.onChange(e.target.value)}
        style={props.style}
        placeholder={props.placeholder}
        value={props.value}
      />
      {props.error && props.error.length > 0 && <p className="error">{props.error}</p>}
    </div>
  )
}
