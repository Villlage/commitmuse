import React, { useState } from 'react'
import './style.scss'
import FormField from '../../components/FormField'
import PopUp from '../../components/PopUp'
import Button from '../../components/Button'
import { validateEmail } from '../../../helpers/base'
import { emailErrorMessage, passwordLength } from '../../../constants/auth'
import AuthService from '../../../services/auth.service'
import { log } from '../../../services/logging.service'
import Message from '../../components/Message'

const authService = new AuthService()

interface AuthProps {
  isOpen: boolean
  onClose(): void
  fetchUser(): void
}

export default function Auth(props: AuthProps) {
  const [is_login, set_is_login] = useState(true)
  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')

  const [user, set_user] = useState({
    email: '',
    password: '',
  })

  const [error, set_error] = useState({
    email: '',
    password: '',
  })

  const title = is_login ? 'Login' : 'Register'

  const notValid = () =>
    Object.values(user).some(i => i === '') || !validateEmail(user.email) || user.password.length < 6

  const onSubmit = async () => {
    try {
      const res = is_login ? await authService.login(user) : await authService.register(user)

      if (res) {
        if (res.error) {
          set_request_error(res.error)
          return setTimeout(() => set_request_error(''), 3000)
        }

        await props.fetchUser()

        return props.onClose()
      }
    } catch (e) {
      log('Error on sign in: ', e)
      set_request_error(e.error || e.toString)
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  return (
    <PopUp isOpen={props.isOpen} onClose={props.onClose}>
      <section className="Auth-module">
        <header>
          <h2>{title}</h2>
        </header>
        <div className="body">
          <FormField
            label="Email"
            placeholder="Email address"
            error={error.email}
            value={user.email}
            onChange={e => {
              set_error({ ...error, email: '' })
              set_user({ ...user, email: e })
              !validateEmail(e) && set_error({ ...error, email: emailErrorMessage })
            }}
          />
          <FormField
            label="Password"
            placeholder="Password"
            error={error.password}
            value={user.password}
            onChange={e => {
              set_error({ ...error, password: '' })
              set_user({ ...user, password: e })
              e.length < 6 && set_error({ ...error, password: passwordLength })
            }}
          />
          <Button loading={loading} disabled={notValid()} onClick={onSubmit}>
            {title}
          </Button>
        </div>
        <footer>
          <p>
            {is_login ? "Don't have" : 'Already have'} an account?
            <span onClick={() => set_is_login(!is_login)}>{is_login ? 'Sign Up' : 'Sign In'}</span>
          </p>
        </footer>
      </section>
      {request_error.length > 0 && <Message message={request_error} />}
    </PopUp>
  )
}
