import React from 'react'
import './style.scss'
import { createEl } from '../../../../helpers/base'

interface PageContentProps {
  children: React.ReactChild | React.ReactChild[]
  title?: string | React.ReactElement
}

export default function PageContent(props: PageContentProps) {
  return (
    <section className="PageContent-module">
      <div className="top-wrapper" />
      <section className="content">
        {createEl('h1', props.title, { className: 'page-title' })}
        {props.children}
      </section>
    </section>
  )
}