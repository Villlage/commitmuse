import React from 'react'
import './style.scss'
import PageHeader from '../../../../modules/common/PageHeader'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Field from '../../../../components/Field'

interface SettingsProps extends ScreenProps {}

export default function Settings(props: SettingsProps) {
  return (
    <article className="Settings-page">
      <PageHeader user={props.currentUser} />
      <PageContent title="Settings">
        <div className="wrapper">
          <h2>Account Information</h2>
          <section className="account_info">
            <Field title="FIRST NAME">Johan</Field>
            <Field title="LAST NAME">Serna</Field>
            <Field className="full" title="Email address">jonah.serna@emailaddress.com</Field>
            <Field className="full" title="">Change Password</Field>
          </section>
          <h2>Contract Information</h2>
          <section className="contract_info">
            <Field className="full" title="Current income">$95K / YEAR</Field>
            <Field className="full" title="">Cancel ISA Contract</Field>
          </section>
        </div>
      </PageContent>
    </article>
  )
}