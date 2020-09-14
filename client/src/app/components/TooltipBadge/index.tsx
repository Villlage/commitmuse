import React, { useState } from 'react'
import './style.scss'
import Icon from '../Icon'

interface TooltipBadgeProps {
  tooltip: string
  label?: string
}

export default function TooltipBadge(props: TooltipBadgeProps) {
  const [show, set_show] = useState(false)
  const icon = show ? `/web/assets/icons/question-circle-active.svg` : `/web/assets/icons/question-circle.svg`
  return (
    <div className="TooltipBadge-component">
      {props.label && <label onClick={() => set_show(!show)}>{props.label}</label>}
      <div onClick={() => set_show(!show)} className="question_circle">
        <img alt="circle" src={icon} />
        {show && (
          <div className="tooltip">
            {props.tooltip} <Icon icon="tooltip_arrow" />
          </div>
        )}
      </div>
    </div>
  )
}
