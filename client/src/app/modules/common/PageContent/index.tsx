import React from 'react'
import './style.scss'
import Message, { MessageType } from 'app/components/Message'

interface PageContentProps {
  children: React.ReactChild | React.ReactChild[]
  title?: string | React.ReactElement
  error?: MessageType | string
}

export default function PageContent(props: PageContentProps) {
  const { title, error, children } = props

  return (
    <section className="PageContent-module">
      <section className="content">
        {title && <div className={'page-title'}>{title}</div>}
        {children}
      </section>
      <Message message={error || ''} />
    </section>
  )
}
