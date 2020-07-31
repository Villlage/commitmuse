import React from 'react'
import './style.scss'
import { fixClass } from '../../../../helpers/base'

interface OfferStatusProps {
  statuses: Array<string>
  selected: string
}

export default function OfferStatus(props: OfferStatusProps) {
  return (
    <section className="OfferStatus-module">
      {props.statuses.map((status, i) => (
        <div
          className={`status${fixClass(status === props.selected && 'selected')}`}
          key={i}
        >
          {status}
        </div>
      ))}
    </section>
  )
}