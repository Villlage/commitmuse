import './style.scss'
import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { IsaClient } from '../../../../../interfaces/baseIntefaces'
import { validateEmail } from '../../../../../helpers/base'
import { emailErrorMessage } from '../../../../../constants/auth'

interface ClientStepProps {
  client: IsaClient
  onChange(e: string, key: string): void
  onNext(): void
}

export default function ClientStep(props: ClientStepProps) {
  const [email_error, set_email_error] = useState('')
  const notValid = () => Object.values(props.client).some(i => i === '') || !validateEmail(props.client.email)

  return (
    <section className="ClientStep-module">
      <h2>Client Information</h2>
      <header>
        <Input
          placeholder="First Name"
          onChange={e => props.onChange(e, 'first_name')}
          value={props.client.first_name}
        />
        <Input placeholder="Last Name" onChange={e => props.onChange(e, 'last_name')} value={props.client.last_name} />
        <Input
          placeholder="Email"
          onChange={e => {
            set_email_error('')
            props.onChange(e, 'email')
            !validateEmail(e) && set_email_error(emailErrorMessage)
          }}
          error={email_error}
          value={props.client.email}
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
