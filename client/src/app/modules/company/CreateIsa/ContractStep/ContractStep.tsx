import './style.scss'
import React, { useState } from 'react'
import Button from '../../../../components/Button'
import Message from '../../../../components/Message'
import { SYSTEM_COLORS } from '../../../../../constants/system'

interface ContractStepProps {
  onNext(): void
}

export default function ContractStep(props: ContractStepProps) {
  const [show_msg, set_show_msg] = useState(false)
  return (
    <section className="ContractStep-module">
      <h2>Review and Sign Your Contract</h2>
      <Button
        background="MainWarning"
        onClick={() => {
          set_show_msg(true)
          setTimeout(() => props.onNext(), 3000)
        }}
        className="next-btn"
      >
        Send Contract to Review
      </Button>
      {show_msg && (
        <Message
          background={SYSTEM_COLORS.MainSuccess}
          message="Contract Sent! It should be in your inbox in the next five minutes.Thank you"
        />
      )}
    </section>
  )
}
