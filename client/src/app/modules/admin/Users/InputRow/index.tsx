import React, { useState } from 'react'
import './style.scss'
import { log } from '../../../../../services/logging.service'
import { intOrFloat } from '../../../../../helpers/base'
import Button from '../../../../components/Button'
import AdminService from '../../../../../services/admin.service'
import Input from '../../../../components/Input'

const adminService = new AdminService()

interface InputRowProps {
  userId: number
  value: string
  key: string
  onSave?(): void
  placeholder?: string
  error?: string
  isNumber?: boolean
  validate?(e: string): boolean
}

export default function InputRow(props: InputRowProps) {
  const [value, set_value] = useState(props.value)
  const [loading, set_loading] = useState(false)

  const onSave = async () => {
    try {
      set_loading(true)
      const res = await adminService.editUser(props.userId, { [props.key]: value })
      if (props.onSave && res) {
        props.onSave()
      }
      set_loading(false)
    } catch (e) {
      log(e)
    }
  }

  return (
    <div className="InputRow-module">
      <Input
        error={props.validate && !props.validate(value) ? props.error : undefined}
        placeholder={props.placeholder}
        value={value}
        onChange={e => (props.isNumber ? intOrFloat(e) && set_value(e) : set_value(e))}
      />
      <Button
        onClick={onSave}
        loading={loading}
        disabled={props.value === value || loading || (props.validate && !props.validate(value)) || value.length === 0}
        background="MainSuccess"
      >
        Save
      </Button>
    </div>
  )
}
