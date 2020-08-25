import './style.scss'
import React from 'react'
import Button from '../../../../components/Button'

interface ContractStepProps {
  onNext(): void
}

export default function ContractStep(props: ContractStepProps) {
  return (
    <section className="ContractStep-module">
      <h2>Review and Sign Your Contract</h2>
      <Button background="MainWarning" onClick={props.onNext} className="next-btn">view my contract</Button>
    </section>
  )
}