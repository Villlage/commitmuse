import React from 'react'
import './style.scss'
import Message, { MessageType } from 'app/components/Message'

interface PageContentProps {
  children: React.ReactChild | React.ReactChild[]
  title?: string | React.ReactElement
  error?: MessageType | string
  loading?: boolean
}

export default function PageContent(props: PageContentProps) {
  return (
    <section className="PageContent-module">
      <section className="content">
        {props.title && <div className={'page-title'}>{props.title}</div>}
        {props.loading ? <Loader loading={true} /> : props.children}
      </section>
      <Message message={props.error || ''} />
    </section>
  )
}

interface LoaderProps {
  loading: boolean
}

function Loader(props: LoaderProps) {
  return (
    <div className="Loader-indicator">
      <div className="loading-line" />
    </div>
  )
}
