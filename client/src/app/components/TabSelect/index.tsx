import React from 'react'
import { fixClass, notEmptyArray } from '../../../helpers/base'
import './style.scss'

interface TabSelectProps {
  label: string
  value: string
  options: string[]
  onChange(s: string): void
}

export default function TabSelect(props: TabSelectProps) {
  return (
    <div className="TabSelect-component">
      <p>{props.label}</p>
      <div className="options">
        {notEmptyArray(props.options) &&
          props.options.map(option => (
            <div
              key={option}
              className={`option${fixClass(option === props.value && 'selected')}`}
              onClick={() => props.onChange(option)}
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  )
}
