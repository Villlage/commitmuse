import * as React from 'react'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import { SYSTEM_COLORS } from '../../../constants/system'
import { fixClass } from '../../../helpers/base'
import './style.scss'
import Icon, { SystemIcons } from '../Icon'

const Btn = styled.button<any>`
  // @ts-ignore
  background: ${props => SYSTEM_COLORS[props.background]};
  color: ${props => props.color || 'white'};
  :hover {
    // @ts-ignore
    background: ${props => SYSTEM_COLORS[props.background.replace('Main', 'Hover')]};
  }
`

type ButtonBackground =
  | 'MainPrimary'
  | 'MainSecondary'
  | 'MainSuccess'
  | 'MainError'
  | 'MainWarning'
  | 'MainInfo'
  | 'MainLight'
  | 'MainWhite'

interface ButtonProps {
  children: any
  onClick?: any
  className?: string
  background?: ButtonBackground
  color?: string
  style?: CSSProperties
  disabled?: boolean
  loading?: boolean
  icon?: SystemIcons
}

export default function Button(props: ButtonProps) {
  return (
    <Btn
      className={`Button-component${fixClass(props.className)}`}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      background={props.background || 'MainPrimary'}
      color={['MainLight', 'MainWhite'].includes(props.background || '') ? SYSTEM_COLORS.Title : props.color}
    >
      {props.loading ? (
        <Loader />
      ) : (
        <>
          {props.children} {props.icon && <Icon icon={props.icon} style={{ marginLeft: 6 }} />}
        </>
      )}
    </Btn>
  )
}

const Loader = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
