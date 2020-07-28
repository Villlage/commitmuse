import React from 'react'
import './style.scss'
import Icon from '../../../../components/Icon'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'

export default function SignUp(props: ScreenProps) {
  return (
    <article className="SignUp-page">
      <PageContent>
        <div className="logo">
          <img src="/assets/icons/rocket.svg" alt="logo" />
          <p>Logo</p>
        </div>
        <h2>Register</h2>
        <div className="FormField-auth">
          <Icon icon="account" />
        </div>
      </PageContent>
    </article>
  )
}