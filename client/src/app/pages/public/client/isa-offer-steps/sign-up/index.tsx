import React from 'react'
import './style.scss'
import Input from '../../../../../components/Input'
import Button from '../../../../../components/Button'

interface ClientIsaSignUpProps {
  onNext(): void
}

export default function ClientIsaSignUp(props: ClientIsaSignUpProps) {
  return (
    <section className="ClientIsaSignUp-module">
      <div className="fields">
        <Input icon="mail" onChange={() => null} placeholder="EMAIL ADDRESS" value={''} />
        <Input icon="key" onChange={() => null} placeholder="Password" value={''} />
        <Input icon="key" onChange={() => null} placeholder="Confirm your password" value={''} />
      </div>
      <footer>
        <Button background="MainWarning" icon="arrow-right"  onClick={props.onNext}>NEXT</Button>
      </footer>
    </section>
  )
}