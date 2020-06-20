import * as React from 'react'
import styled from 'styled-components'
import './style.scss'

interface Props {
  value: boolean
  onChange?: (e: boolean) => void
  isDisabled?: boolean
  label?: string
}

const Wrapper = styled<any>('div')`
  pointer-events: ${props => props.isDisabled && 'none'};
`
const CheckboxContainer = styled<any>('div')`
  background: #ffffff;
  border: 1px solid ${props => (props.isDisabled ? '#B1BED6' : '#BDBDBD')};
`
const CheckMark = styled<any>('span')`
  border: solid ${props => (props.isDisabled ? '#B1BED6' : '#2E353C')};
`
const Label = styled<any>('span')`
  color: ${props => (props.isDisabled ? '#B1BED6' : '#212121')};
`

export default function CheckBox(props: Props) {
  return (
    <Wrapper
      className="checkbox-container"
      onClick={() => props.onChange && props.onChange!(!props.value)}
      isDisabled={props.isDisabled}
    >
      <CheckboxContainer isDisabled={props.isDisabled} className="checkbox-container_checkbox">
        {props.value ? <CheckMark isDisabled={props.isDisabled} className="check_mark" /> : null}
      </CheckboxContainer>
      <Label isDisabled={props.isDisabled} className="checkbox-container_text">
        {props.label}
      </Label>
    </Wrapper>
  )
}
