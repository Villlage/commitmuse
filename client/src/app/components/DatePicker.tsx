import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

interface DatePickerProps {
  label: string
  value: string
  placeholder: string
  onChange(e: Date | null): void
}

const Wrapper = styled.div<any>`
  .label {
    font-family: Gothic A1, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: #5e6672;
    margin-bottom: 8px;
  }
`

export default function DatePicker(props: DatePickerProps) {
  return (
    <Wrapper className="DatePicker-component">
      <p className="label">{props.label}</p>
      <ReactDatePicker value={props.value} placeholderText={props.placeholder} onChange={e => props.onChange(e)} />
    </Wrapper>
  )
}
