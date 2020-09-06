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
  const [loading, set_loading] = useState(false)
  return (
    <section className="ContractStep-module">
      <h2>Review and Sign Your Contract</h2>
      <Button
        loading={loading}
        background="MainWarning"
        onClick={() => {
          set_loading(true)
          props.onNext()
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
