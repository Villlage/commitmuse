import * as React from 'react'
import './style.scss'
import { notEmptyArray } from '../../../helpers/base'

interface TabsProps {
  tabs: string[]
  activeTab: string
  onChange(tabs: string): void
}

export default function Tabs(props: TabsProps) {
  return (
    <div className="Tabs-module">
      {notEmptyArray(props.tabs) &&
        props.tabs.map((tab, index) => {
          const isActive = tab.toLowerCase() === props.activeTab.toLowerCase()
          return (
            <div
              style={
                isActive
                  ? {
                      color: '#19216C',
                      borderColor: '#19216C',
                    }
                  : undefined
              }
              onClick={() => props.onChange(tab)}
              key={index}
            >
              {tab}
            </div>
          )
        })}
    </div>
  )
}
