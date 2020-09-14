import './style.scss'
import React, { useLayoutEffect, useState } from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { IsaProgram } from '../../../../../interfaces/baseIntefaces'
import { isNumber } from '../../../../../helpers/base'
import UserService from '../../../../../services/user.service'
import Select from '../../../../components/Select/Select'

const userService = new UserService()

interface ProgramStepProps {
  program: IsaProgram
  onChange(e: string, key: string): void
  onNext(): void
}

export default function ProgramStep(props: ProgramStepProps) {
  const [industry_fields, set_industry_fields] = useState<string[]>([])

  const notValid = () => Object.values(props.program).some(i => i === '')

  const fetchFields = async () => {
    const res = await userService.getIndustryFields()
    set_industry_fields(res)
  }

  useLayoutEffect(() => {
    fetchFields()
  }, [])

  return (
    <section className="ProgramStep-module">
      <h2>Program Information</h2>
      <header>
        <Select
          value={props.program.field}
          options={industry_fields}
          onChange={e => props.onChange(e, 'field')}
          placeholder="Position Field"
          tooltip="This is the field the client will enter post- graduation"
        />
        <Input
          placeholder="Duration"
          onChange={e => isNumber(e) && props.onChange(e, 'duration')}
          value={props.program.duration}
          postFix="Weeks"
          tooltip="This is how long the program is"
        />
        <Input
          placeholder="Description"
          onChange={e => props.onChange(e, 'description')}
          value={props.program.description}
          className="full"
          tooltip="This is the client’s objective upon graduating from <programName>"
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
