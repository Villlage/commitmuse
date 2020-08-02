import React, { useState } from 'react'
import './style.scss'
import Input from '../../../../../components/Input'
import Button from '../../../../../components/Button'
import { validateEmail } from '../../../../../../helpers/base'
import AuthService from '../../../../../../services/auth.service'
import { log } from '../../../../../../services/logging.service'
import { emailErrorMessage, passwordLength, passwordMustMatch } from '../../../../../../constants/auth'
import Message from '../../../../../components/Message'
import ClientService from '../../../../../../services/client.service'

const clientService = new ClientService()

interface ClientIsaSignUpProps {
  user_id: number
  email: string
  onNext(): void
}

export default function ClientIsaSignUp(props: ClientIsaSignUpProps) {
  const [password, set_password] = useState('')

  const [password_confirm, set_password_confirm] = useState('')
  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')

  const [error, set_error] = useState({
    password: '',
    password_confirm: '',
  })

  const onSubmit = async () => {
    set_loading(true)
    try {
      const res = await clientService.resetPassword(props.user_id, password)

      if (res) {
        if (res.error) {
          set_loading(false)
          set_request_error(res.error)
          return setTimeout(() => set_request_error(''), 3000)
        }

        set_loading(false)
        await props.onNext()
      }
    } catch (e) {
      set_loading(false)
      log('Error on sign in: ', e)
      set_request_error(e.error || e.toString)
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  const notValid = () => password.length < 6 || password_confirm !== password

  return (
    <section className="ClientIsaSignUp-module">
      <div className="fields">
        <Input
          disabled={true}
          className="full"
          icon="mail"
          placeholder="Email Address *"
          value={props.email}
          onChange={e => null}
        />
        <Input
          className="full"
          icon="key"
          placeholder="Password *"
          type="password"
          error={error.password}
          value={password}
          onChange={e => {
            set_error({ ...error, password: '' })
            set_password(e)
            e.length < 6 && set_error({ ...error, password: passwordLength })
          }}
        />
        <Input
          className="full"
          icon="key"
          placeholder="Confirm your password *"
          type="password"
          error={error.password_confirm}
          value={password_confirm}
          onChange={e => {
            set_error({ ...error, password_confirm: '' })
            set_password_confirm(e)
            e !== password && set_error({ ...error, password_confirm: passwordMustMatch })
          }}
        />
      </div>
      <footer>
        <Button background="MainWarning" disabled={notValid()} onClick={onSubmit} icon="arrow-right" loading={loading}>
          NEXT
        </Button>
      </footer>
      {request_error.length > 0 && <Message message={request_error} />}
    </section>
  )
}
