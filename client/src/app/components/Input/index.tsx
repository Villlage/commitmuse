import './style.scss'
import React, { CSSProperties, useRef, useState } from 'react'
import { fixClass } from '../../../helpers/base'
import Icon, { SystemIcons } from '../Icon'
import TooltipBadge from '../TooltipBadge'

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
  tooltip?: string
  disabled?: boolean
}

export default function Input(props: InputProps) {
  const [visible, set_visible] = useState(props.type !== 'password')
  const [rippled, set_rippled] = useState(false)
  const inputEl: any = useRef(null)

  return (
    <div
      className={`Input-component${fixClass(props.error && 'has-error')}${fixClass(
        props.tooltip && 'has-tooltip',
      )}${fixClass(props.className)}${fixClass(props.icon && 'with-icon')}${fixClass(rippled && 'rippled')}`}
    >
      {props.icon && <Icon icon={props.icon} />}
      <div className="input-container">
        <div className={`ripple${fixClass((rippled || !!props.value) && 'focused')}`}>
          {props.placeholder} {props.tooltip && (rippled || !!props.value) && <TooltipBadge tooltip={props.tooltip} />}
        </div>
        {props.tooltip && !props.value && !rippled && (
          <div className="tooltip">
            <span onClick={() => inputEl.current && inputEl.current.focus()}>{props.placeholder} </span>
            <TooltipBadge tooltip={props.tooltip} />
          </div>
        )}
        <input
          ref={inputEl}
          onFocus={() => set_rippled(true)}
          onBlur={() => {
            !props.value && set_rippled(false)
          }}
          disabled={props.disabled}
          type={visible ? 'text' : props.type || 'text'}
          onChange={e => props.onChange(e.target.value)}
          style={props.style}
          placeholder={rippled ? '' : props.placeholder}
          value={props.value}
        />
      </div>
      {props.postFix && <div className="post-fix">{props.postFix}</div>}
      {props.type === 'password' && <Icon className="eye-icon" onClick={() => set_visible(!visible)} icon="eye" />}
      {props.error && props.error.length > 0 && <p className="error">{props.error}</p>}
    </div>
  )
}
