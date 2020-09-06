import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Input from '../../../../components/Input'
import Icon from '../../../../components/Icon'
import { validateEmail } from '../../../../../helpers/base'
import { log } from '../../../../../services/logging.service'
import { emailErrorMessage, passwordLength, passwordMustMatch, requiredFieldError } from '../../../../../constants/auth'
import Button from '../../../../components/Button'
import Message from '../../../../components/Message'
import { Link } from 'react-router-dom'
import UserService from '../../../../../services/user.service'

const userService = new UserService()

interface CoachSignUpProps extends ScreenProps {
  match: any
}

export default function CoachSignUp(props: CoachSignUpProps) {
  const [user, set_user] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const [password_confirm, set_password_confirm] = useState('')
  const [loading, set_loading] = useState(true)
  const [request_error, set_request_error] = useState('')

  const [error, set_error] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const coach_id = props.match.params.id
  const token = props.location.search.split('?token=')[1]

  const notValid = () => user.password.length < 6 || user.password !== password_confirm

  const fetchCoach = async () => {
    try {
      const res = await userService.getCoach(coach_id)
      if (res) {
        if (res.error) {
          set_loading(false)
          set_request_error(res.error)
          return setTimeout(() => set_request_error(''), 3000)
        }

        set_user({
          ...user,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
        })

        return set_loading(false)
      }
    } catch (e) {
      set_loading(false)
      log('Error on sign in: ', e)
      set_request_error(e.error || e.toString)
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    fetchCoach()
  }, [])

  const onSubmit = async () => {
    set_loading(true)
    try {
      const res = await userService.resetPassword(coach_id, user.password, token)

      if (res) {
        if (res.error) {
          set_loading(false)
          set_request_error(res.error)
          return setTimeout(() => set_request_error(''), 3000)
        }

        props.setCurrentUser(res)
        set_loading(false)

        return props.history.push('/coach/clients')
      }
    } catch (e) {
      set_loading(false)
      log('Error on sign in: ', e)
      set_request_error(e.error || e.toString)
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  return (
    <article className="CoachSignUp-page">
      <PageContent>
        <h2>Choose a password for your account</h2>
        <section className="form">
          <div className="fields">
            <Input
              disabled
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
              disabled
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
              disabled
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
              Already have an account? <Link to="/login">Sign In</Link>
            </p>

            <Button disabled={notValid()} onClick={onSubmit} loading={loading}>
              NEXT <Icon icon="arrow-right" />{' '}
            </Button>
          </footer>
        </section>
      </PageContent>
      <Message message={request_error} />
    </article>
  )
}
