import React from 'react'
import './style.scss'

interface BadgeProps {
  value: number
}

export default function Badge(props: BadgeProps) {
  return <span className="Badge-component">{props.value}</span>
}
