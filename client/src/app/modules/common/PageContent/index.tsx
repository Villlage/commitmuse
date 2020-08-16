import React from 'react'
import './style.scss'
import { createEl } from '../../../../helpers/base'
import Message, { MessageType } from '../../../components/Message'

interface PageContentProps {
  children: React.ReactChild | React.ReactChild[]
  title?: string | React.ReactElement
  error?: MessageType | string
}

export default function PageContent(props: PageContentProps) {
  return (
    <section className="PageContent-module">
      <div className="top-wrapper" />
      <section className="content">
        {createEl('h1', props.title, { className: 'page-title' })}
        {props.children}
      </section>
      <Message message={props.error || ''} />
    </section>
  )
}