import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Field from '../../../../components/Field'
import Button from '../../../../components/Button'
import { log } from '../../../../../services/logging.service'
import AuthService from '../../../../../services/auth.service'

const authService = new AuthService()

interface SettingsProps extends ScreenProps {}

export default function Settings(props: SettingsProps) {

  const onLogout = async () => {
    try {
      await authService.signOut()
      await props.fetchUser()
      props.history.push('/login')
    } catch (e) {
      log(e)
    }
  }

  return (
    <article className="Settings-page">
      <PageContent title="Settings">
        <div className="wrapper">
          <h2>Account Information</h2>
          <section className="account_info">
            <Field title="FIRST NAME">{props.currentUser.first_name}</Field>
            <Field title="LAST NAME">{props.currentUser.last_name}</Field>
            <Field className="full" title="Email address">{props.currentUser.email}</Field>
            <Field className="full" title="">Change Password</Field>
          </section>
          <h2>Contract Information</h2>
          <section className="contract_info">
            <Field className="full" title="Current income">$ - / YEAR</Field>
            <Field className="full" title="">Cancel ISA Contract</Field>
          </section>
          <Button style={{marginTop: 16}} onClick={onLogout}>Logout</Button>
        </div>
      </PageContent>
    </article>
  )
}