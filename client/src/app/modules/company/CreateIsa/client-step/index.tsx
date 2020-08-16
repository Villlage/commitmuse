import './style.scss'
import React from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'

interface ClientStepProps {
  first_name: string
  last_name: string
  email: string
  onChange(e: string, key: string): void
}

export default function ClientStep(props: ClientStepProps) {
  return (
    <section className="ClientStep-module">
      <header>
        <Input placeholder="First Name" onChange={e => props.onChange(e, 'first_name')} value={props.first_name} />
        <Input placeholder="Last Name" onChange={e => props.onChange(e, 'last_name')} value={props.last_name} />
        <Input placeholder="Email" onChange={e => props.onChange(e, 'email')} value={props.email} />
      </header>
      <footer>
        <Button background="MainWarning">Next</Button>
      </footer>
    </section>
  )
}