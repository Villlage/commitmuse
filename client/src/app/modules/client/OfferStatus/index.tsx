import React from 'react'
import './style.scss'
import { fixClass } from '../../../../helpers/base'

interface OfferStatusProps {
  statuses: Array<string>
  activeIndex: number
}

export default function OfferStatus(props: OfferStatusProps) {
  return (
    <section className="OfferStatus-module">
      {props.statuses.map((status, i) => (
        <div
          className={`status${fixClass(i === props.activeIndex && 'selected')}`}
          key={i}
        >
          {status}
        </div>
      ))}
    </section>
  )
}