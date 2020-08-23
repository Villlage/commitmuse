import './style.scss'
import React from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import ButtonSelect from '../../../../components/ButtonSelect'

interface IsaOfferStepProps {
  description: string
  onChange(e: string, key: string): void
  onNext(): void
}

export default function IsaOfferStep(props: IsaOfferStepProps) {
  return (
    <section className="IsaOfferStep-module">
      <h2>Offer Details</h2>
      <header>
        <ButtonSelect onSelect={() => null} options={['From total income', 'From new raise', 'Placement']} selected={''}/>
        <Input placeholder="Description" onChange={e => props.onChange(e, 'description')} value={props.description} className="full" />
      </header>
      <footer>
        <Button background="MainWarning" onClick={props.onNext}>Next</Button>
      </footer>
    </section>
  )
}