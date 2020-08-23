import './style.scss'
import React from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'

interface ProgramStepProps {
  position_field: string
  duration: string
  description: string
  onChange(e: string, key: string): void
  onNext(): void
}

export default function ProgramStep(props: ProgramStepProps) {
  return (
    <section className="ProgramStep-module">
      <h2>Program Information</h2>
      <header>
        <Input placeholder="Position Field" onChange={e => props.onChange(e, 'position_field')} value={props.position_field} />
        <Input placeholder="Duration" onChange={e => props.onChange(e, 'duration')} value={props.duration} />
        <Input placeholder="Description" onChange={e => props.onChange(e, 'description')} value={props.description} className="full" />
      </header>
      <footer>
        <Button background="MainWarning" onClick={props.onNext}>Next</Button>
      </footer>
    </section>
  )
}