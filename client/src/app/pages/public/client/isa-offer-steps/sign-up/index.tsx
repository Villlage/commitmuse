import React, { useState } from 'react'
import './style.scss'
import Input from '../../../../../components/Input'
import Button from '../../../../../components/Button'
import { validateEmail } from '../../../../../../helpers/base'
import AuthService from '../../../../../../services/auth.service'
import { log } from '../../../../../../services/logging.service'
import { emailErrorMessage, passwordLength, passwordMustMatch } from '../../../../../../constants/auth'
import Message from '../../../../../components/Message'

const authService = new AuthService()

interface ClientIsaSignUpProps {
  onNext(): void
}

export default function ClientIsaSignUp(props: ClientIsaSignUpProps) {
  const [user, set_user] = useState({
    email: '',
    password: '',
  })

  const [password_confirm, set_password_confirm] = useState('')
  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')

  const [error, set_error] = useState({
    email: '',
    password: '',
    password_confirm: '',
  })

  const onSubmit = async () => {
    set_loading(true)
    try {
      const res = await authService.register(user)

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

  const notValid = () =>
    Object.values(user).some(i => i === '') || !validateEmail(user.email) || user.password.length < 6 || password_confirm !== user.password

  return (
    <section className="ClientIsaSignUp-module">
      <div className="fields">
        <Input
          className="full"
          icon="mail"
          placeholder="Email Address *"
          error={error.email}
          value={user.email}
          onChange={e => {
            set_error({ ...error, email: '' })
            set_user({ ...user, email: e })
            !validateEmail(e) && set_error({ ...error, email: emailErrorMessage })
          }}
        />
        <Input
          className="full"
          icon="key"
          placeholder="Password *"
          type="password"
          error={error.password}
          value={user.password}
          onChange={e => {
            set_error({ ...error, password: '' })
            set_user({ ...user, password: e })
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
            e !== user.password && set_error({ ...error, password_confirm: passwordMustMatch })
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
