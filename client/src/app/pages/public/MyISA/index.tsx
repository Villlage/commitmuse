import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../interfaces/baseIntefaces'
import PageHeader from '../../../modules/common/PageHeader'

interface MyIsa extends ScreenProps {}

export default function MyIsa(props: MyIsa) {
  return (
    <article className="MyIsa-page">
      <PageHeader />
      <section className="content">
        <div className="myIsa">My ISA’s</div>
      </section>
    </article>
  )
}