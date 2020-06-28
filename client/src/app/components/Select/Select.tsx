import * as React from 'react'
import './style.scss'
import { useState } from 'react'
import { notEmptyArray, fixClass } from '../../../helpers/base'
import Icon from '../Icon'

interface SelectProps {
  value: string
  options: string[] | null | undefined
  onChange(option: string): void
  placeholder: string
  label?: string
  error?: string
  disabled?: boolean
}

export default function Select(props: SelectProps) {
  const [showOptions, setShowOptions] = useState(false)
  const isError = props.error && props.error.length > 0
  return (
    <div className={`Select-component${fixClass(isError && 'has-error')}${fixClass(props.disabled && 'disabled')}`}>
      {props.label && <label>{props.label}</label>}
      <div
        onClick={() => !props.disabled && setShowOptions(!showOptions)}
        className={`placeholder ${!!props.value ? 'value' : ''}`}
      >
        {props.value || props.placeholder}
        <Icon icon="select_down" />
        {showOptions && notEmptyArray(props.options) && (
          <div className="options">
            {props.options!.map((option, index) => (
              <div
                className={`option${fixClass(option === props.value && 'selected')}`}
                key={index}
                onClick={() => {
                  setShowOptions(false)
                  props.onChange(option)
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {showOptions && <div onClick={() => setShowOptions(!showOptions)} className="overlay" />}
      {isError && <p className="error">{props.error}</p>}
    </div>
  )
}
