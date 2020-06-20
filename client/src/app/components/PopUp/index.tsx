import './style.scss'
import React, { ReactNode } from 'react'
import { fixClass, noScroll } from '../../../helpers/base'
import Icon from '../Icon'

interface PopUpProps {
  isOpen: boolean
  onClose(): void
  className?: string
  children: ReactNode[] | ReactNode
}

export default function PopUp(props: PopUpProps) {
  return props.isOpen ? (
    <section className="PopUp-component">
      {noScroll}
      <div className="overlay" onClick={props.onClose} />
      <div className={`popup-content${fixClass(props.className)}`}>
        <Icon className="close" onClick={props.onClose} icon="close" />
        {props.children}
      </div>
    </section>
  ) : null
}
