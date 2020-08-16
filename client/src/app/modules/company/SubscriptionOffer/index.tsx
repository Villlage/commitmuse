import React from 'react'
import './style.scss'

interface Offer {
  title: string
  description: string
  oldCost: number
  cost: number
}

export default function SubscriptionOffer({ offer }: { offer: Offer }) {
    return (
      <div className="SubscriptionOffer-module">
        <div className="description">
          <h2>{offer.title}</h2>
          <p>{offer.description}</p>
        </div>
        <div className="cost">
          <h2>${offer.oldCost}</h2>
          <p>${offer.cost}</p>
        </div>
      </div>
    )
  }