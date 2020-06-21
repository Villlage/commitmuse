import React, { useState } from 'react'
import './style.scss'
import Icon from '../Icon'

interface TooltipBadgeProps {
  tooltip: string
}

export default function TooltipBadge(props: TooltipBadgeProps) {
  const [show, set_show] = useState(false)
  return (
    <div className="TooltipBadge-component">
      {show && <div className="tooltip">{props.tooltip}</div>}
      <Icon onClick={() => set_show(!show)} icon={show ? 'question_circle_active' : 'question_circle'} />
    </div>
  )
}
