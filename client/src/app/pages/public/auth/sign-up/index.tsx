import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Input from '../../../../components/Input'
import Icon from '../../../../components/Icon'
import { validateEmail } from '../../../../../helpers/base'
import { log } from '../../../../../services/logging.service'
import AuthService from '../../../../../services/auth.service'
import { emailErrorMessage, passwordLength, passwordMustMatch, requiredFieldError } from '../../../../../constants/auth'
import Button from '../../../../components/Button'
import Message from '../../../../components/Message'
import { Link } from 'react-router-dom'

const authService = new AuthService()

export default function SignUp(props: ScreenProps) {
  const [user, set_user] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const [password_confirm, set_password_confirm] = useState('')
  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')

  const [error, set_error] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const notValid = () =>
    Object.values(user).some(i => i === '') || !validateEmail(user.email) || user.password.length < 6

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

        await props.fetchUser()
        set_loading(false)

        return props.history.push('/my-isa')
      }
    } catch (e) {
      set_loading(false)
      log('Error on sign in: ', e)
      set_request_error(e.error || e.toString)
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  return (
    <article className="SignUp-page">
      <PageContent>
        <div className="logo">
          <img src="/web/assets/icons/rocket.svg" alt="logo" />
          <p>Logo</p>
        </div>
        <h2>Register</h2>
        <section className="form">
          <div className="fields">
            <Input
              icon="account"
              placeholder="First Name *"
              error={error.first_name}
              value={user.first_name}
              onChange={e => {
                set_error({ ...error, first_name: '' })
                set_user({ ...user, first_name: e })
                e.length < 1 && set_error({ ...error, first_name: requiredFieldError })
              }}
            />
            <Input
              icon="account"
              placeholder="Last Name *"
              error={error.last_name}
              value={user.last_name}
              onChange={e => {
                set_error({ ...error, last_name: '' })
                set_user({ ...user, last_name: e })
                e.length < 1 && set_error({ ...error, last_name: requiredFieldError })
              }}
            />

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
          <footer className="full">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign In</Link>
            </p>

            <Button disabled={notValid()} onClick={onSubmit} loading={loading}>
              NEXT <Icon icon="arrow-right" />{' '}
            </Button>
          </footer>
        </section>
      </PageContent>
      {request_error.length > 0 && <Message message={request_error} />}
    </article>
  )
}