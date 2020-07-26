import React, { useState } from 'react'
import './style.scss'
import Icon from '../Icon'
import { fixClass } from '../../../helpers/base'

interface ExpansionPanelProps {
  title: string
  content: any
  isOpen?: boolean
}

export default function ExpansionPanel(props: ExpansionPanelProps) {
  const [isOpen, set_isOpen] = useState(props.isOpen || false)
  return (
    <section className="ExpansionPanel-component">
      <div className={`question${fixClass(isOpen && 'is-open')}`} onClick={() => set_isOpen(!isOpen)}>
        <Icon icon="chevron-right" />
        <h2>{props.title}</h2>
      </div>
      <div className={`answer${fixClass(isOpen && 'is-open')}`}>{props.content}</div>
    </section>
  )
}
