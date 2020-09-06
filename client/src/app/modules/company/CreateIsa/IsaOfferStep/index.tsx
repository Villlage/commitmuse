import './style.scss'
import React from 'react'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import ButtonSelect from '../../../../components/ButtonSelect'
import { validateEmail } from '../../../../../helpers/base'

interface IsaOfferStepProps {
  offer: any
  onChange(e: string, key: string): void
  onNext(): void
}

export default function IsaOfferStep(props: IsaOfferStepProps) {
  const notValid = () => Object.values(props.offer).some(i => i === '')
  return (
    <section className="IsaOfferStep-module">
      <h2>Offer Details</h2>
      <header>
        <ButtonSelect
          onSelect={e => props.onChange(e, 'type')}
          options={['From total income', 'From new raise', 'Placement']}
          selected={props.offer.type}
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
