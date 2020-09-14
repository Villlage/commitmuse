import React from 'react'
import './style.scss'

export interface CardProps {
  children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
  return <div className={'Card-module'}>{children}</div>
}

export default Card
