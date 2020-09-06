import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Input from '../../../../components/Input'
import Icon from '../../../../components/Icon'
import { validateEmail } from '../../../../../helpers/base'
import { log } from '../../../../../services/logging.service'
import AuthService from '../../../../../services/auth.service'
import { emailErrorMessage, passwordLength } from '../../../../../constants/auth'
import Button from '../../../../components/Button'
import Message from '../../../../components/Message'
import { Link } from 'react-router-dom'

const authService = new AuthService()

export default function SignIn(props: ScreenProps) {
  const [user, set_user] = useState({
    email: '',
    password: '',
  })

  const [loading, set_loading] = useState(false)
  const [request_error, set_request_error] = useState('')

  const [error, set_error] = useState({
    email: '',
    password: '',
  })

  const notValid = () =>
    Object.values(user).some(i => i === '') || !validateEmail(user.email) || user.password.length < 6

  const onSubmit = async () => {
    set_loading(true)
    try {
      const res = await authService.login(user)

      if (res) {
        if (res.error) {
          set_loading(false)
          set_request_error(res.error)
          return setTimeout(() => set_request_error(''), 3000)
        }

        props.setCurrentUser(res)
        set_loading(false)

        const initial_routes: any = {
          admin: '/admin/users',
          company_admin: '/company/dashboard',
          coach: '/coach/clients',
          student: '/student/payments',
        }

        return props.history.push(initial_routes[res.user_type])
      }
    } catch (e) {
      set_loading(false)
      log('Error on sign in: ', e)
      set_request_error(e.error || e.toString)
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  return (
    <article className="SignIn-page">
      <PageContent>
        <h2>Login</h2>
        <section className="form">
          <div className="fields">
            <Input
              icon="mail"
              placeholder="Email Address"
              error={error.email}
              value={user.email}
              onChange={e => {
                set_error({ ...error, email: '' })
                set_user({ ...user, email: e })
                !validateEmail(e) && set_error({ ...error, email: emailErrorMessage })
              }}
            />
            <Input
              icon="key"
              placeholder="Password"
              type="password"
              error={error.password}
              value={user.password}
              onChange={e => {
                set_error({ ...error, password: '' })
                set_user({ ...user, password: e })
                e.length < 6 && set_error({ ...error, password: passwordLength })
              }}
            />
          </div>
          <footer className="full">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

            <Button disabled={notValid()} onClick={onSubmit} loading={loading}>
              Login <Icon icon="arrow-right" />{' '}
            </Button>
          </footer>
        </section>
      </PageContent>
      {request_error.length > 0 && <Message message={request_error} />}
    </article>
  )
}
