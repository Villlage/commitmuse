import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../../modules/common/PageHeader'
import PageContent from '../../../../../modules/common/PageContent'
import FAQ from '../../../../../modules/coach/CreateIsa/FAQ'
import ClientInfo from '../../../../../modules/coach/CreateIsa/ClientInfo'

interface CreateIsaProps extends ScreenProps {}

export default function CreateIsa(props: CreateIsaProps) {
  return (
    <article className="CreateIsa-page">
      <PageHeader user={props.currentUser} fetchUser={props.fetchUser} />
      <PageContent title="New ISA Offer">
        <section className="container">
          <ClientInfo/>
          <FAQ/>
        </section>
      </PageContent>
    </article>
  )
}