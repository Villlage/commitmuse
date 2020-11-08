import React, { ReactNode, useState } from 'react'
import { fixClass, isObject } from '../../../helpers/base'
import './style.scss'
import Icon from '../Icon'

interface CollapsibleProps {
  title: string | ReactNode
  children: ReactNode[] | ReactNode
  open?: boolean
  className?: string
}

export default function Collapsible(props: CollapsibleProps) {
  const [collapsed, set_collapsed] = useState(props.open || true)

  return (
    <section className={`Collapsible-component${fixClass(collapsed && 'collapsed')}${fixClass(props.className)}`}>
      {isObject(props.title) ? (
        <div className="collapsible-title" onClick={() => set_collapsed(!collapsed)}>
          <Icon className="arrow" icon="arrow_right" />
          {props.title}
        </div>
      ) : (
        <h2 className="collapsible-title" onClick={() => set_collapsed(!collapsed)}>
          <Icon className="arrow" icon="arrow_right" />
          {props.title}
        </h2>
      )}
      <div className="collapsible-wrapper">{props.children}</div>
    </section>
  )
}
