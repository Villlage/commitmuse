import React from 'react'
import './style.scss'
import { status_colors } from '../../../../constants/system'
import { fixClass } from '../../../../helpers/base'

interface StatusProps {
  selected: 'created' | 'active' | 'paying' | 'completed'
}

export default function Status(props: StatusProps) {
  const className = status_colors.find(s => s.label === props.selected)
  return (
    <section className="Status-module">
      {status_colors.map((status, i) => (
        <div className={`status${fixClass(className && className.label === status.label && 'selected')}${fixClass(className && className.label)}`} key={i}>
          {status.label}
        </div>
      ))}
    </section>
  )
}