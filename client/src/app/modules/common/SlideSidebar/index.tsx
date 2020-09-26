import React, { ReactNode } from 'react'
import './style.scss'
import { fixClass } from '../../../../helpers/base'

interface SlideSidebarProps {
  open: boolean
  onClose(): void
  className?: string
  children?: ReactNode
}

export default function SlideSidebar(props: SlideSidebarProps) {
  return (
    <section className={`SlideSidebar-module${fixClass(props.open && 'open')}${fixClass(props.className)}`}>
      <div className="slide-content">{props.children}</div>
      <div className="slide-overlay" onClick={props.onClose}/>
    </section>
  )
}
