import React, { useState } from 'react'
import './style.scss'
import { intOrFloat } from '../../../../../helpers/base'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import Select from '../../../../components/Select/Select'

interface InputRowProps {
  value: string
  options?: string[]
  placeholder?: string
  error?: string
  isNumber?: boolean
  isSelect?: boolean
  validate?(e: string): boolean
  onSave(e: any): void
}

export default function InputRow(props: InputRowProps) {
  const [value, set_value] = useState(props.value)
  const [loading, set_loading] = useState(false)

  return (
    <div className="InputRow-module">
      {props.isSelect ? (
        <Select
          value={value}
          options={props.options}
          onChange={e => set_value(e)}
          placeholder={props.placeholder}
        />
      ) : (
        <Input
          error={props.validate && !props.validate(value) ? props.error : undefined}
          placeholder={props.placeholder}
          value={value}
          onChange={e => (props.isNumber ? intOrFloat(e) && set_value(e) : set_value(e))}
        />
      )}
      <Button
        onClick={async () => {
          set_loading(true)
          await props.onSave(value)
          set_loading(false)
        }}
        loading={loading}
        disabled={props.value === value || loading || (props.validate && !props.validate(value)) || value.length === 0}
        background="MainSuccess"
      >
        Save
      </Button>
    </div>
  )
}
