import React from 'react'
import './style.scss'
import TooltipBadge from '../../../components/TooltipBadge'
import { fixClass } from '../../../../helpers/base'

interface IsaAssessmentProps {
  className?: string
}

export default function IsaAssessment(props: IsaAssessmentProps) {
  return (
    <div className={`IsaAssessment-module${fixClass(props.className)}`}>
      <TooltipBadge label="Isa assessment" tooltip="good" />
      <p>This ISA looks good!</p>
    </div>
  )
}