import './style.scss'
import React, { CSSProperties, useState } from 'react'
import { fixClass } from '../../../helpers/base'
import Icon, { SystemIcons } from '../Icon'

interface InputProps {
  onChange(e: string): void
  value: string | number
  placeholder?: string
  error?: string
  className?: string
  postFix?: string
  icon?: SystemIcons
  style?: CSSProperties
  type?: string
  disabled?: boolean
  withRipple?: boolean
}

export default function Input(props: InputProps) {
  const [visible, set_visible] = useState(props.type !== 'password')
  const rippled = !!props.value && props.withRipple
  return (
    <div
      className={`Input-component${fixClass(props.error && 'has-error')}${fixClass(props.className)}${fixClass(props.icon && 'with-icon')}${fixClass(rippled && 'rippled')}`}
    >
      {rippled && <div className="ripple">{props.placeholder}</div>}
      {props.icon && <Icon icon={props.icon} />}
      <input
        disabled={props.disabled}
        type={visible ? 'text' : props.type || 'text'}
        onChange={e => props.onChange(e.target.value)}
        style={props.style}
        placeholder={props.placeholder}
        value={props.value}
      />
      {props.postFix && <div className="post-fix">{props.postFix}</div>}
      {props.type === 'password' && <Icon className="eye-icon" onClick={() => set_visible(!visible)} icon="eye" />}
      {props.error && props.error.length > 0 && <p className="error">{props.error}</p>}
    </div>
  )
}
