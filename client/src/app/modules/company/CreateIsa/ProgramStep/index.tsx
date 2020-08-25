import './style.scss'
import React from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { IsaProgram } from '../../../../../interfaces/baseIntefaces'
import { isNumber, validateEmail } from '../../../../../helpers/base'

interface ProgramStepProps {
  program: IsaProgram
  onChange(e: string, key: string): void
  onNext(): void
}

export default function ProgramStep(props: ProgramStepProps) {
  const notValid = () => Object.values(props.program).some(i => i === '')

  return (
    <section className="ProgramStep-module">
      <h2>Program Information</h2>
      <header>
        <Input placeholder="Position Field" onChange={e => props.onChange(e, 'field')} value={props.program.field} />
        <Input
          placeholder="Duration"
          onChange={e => isNumber(e) && props.onChange(e, 'duration')}
          value={props.program.duration}
          postFix="Weeks"
        />
        <Input
          placeholder="Description"
          onChange={e => props.onChange(e, 'description')}
          value={props.program.description}
          className="full"
        />
      </header>
      <footer>
        <Button disabled={notValid()} background="MainWarning" onClick={props.onNext} className="next-btn">
          Next
        </Button>
      </footer>
    </section>
  )
}