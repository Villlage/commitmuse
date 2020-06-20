import * as React from 'react'
import './style.scss'
import styled from 'styled-components'
import { notEmptyArray, fixClass } from '../../../helpers/base'

const StyledTab = styled.div<any>`
  display: flex;
`

interface Tab {
  label: string
  active: boolean
}

interface TabsProps {
  tabs: Tab[]
  onChange(tabs: Tab[]): void
  withLine?: boolean
}

const handleChange = (props: TabsProps, index: number) => {
  props.tabs[index].active = true
  props.onChange(props.tabs)
}

export default function Tabs(props: TabsProps) {
  return (
    <div className={`Tabs-module${fixClass(props.withLine && 'with_line')}`}>
      {notEmptyArray(props.tabs) &&
        props.tabs.map((tab, index) => (
          <StyledTab onClick={() => !tab.active && handleChange(props, index)} key={index} active={tab.active}>
            {tab.label}
          </StyledTab>
        ))}
    </div>
  )
}
