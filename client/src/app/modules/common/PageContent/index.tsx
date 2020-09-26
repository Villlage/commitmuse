import React from 'react'
import './style.scss'
import Message, { MessageType } from 'app/components/Message'
import { ReactComponent as ArrowLeft } from 'icons/arrow-left-white.svg'

interface PageContentProps {
  children: React.ReactChild | React.ReactChild[]
  title?: string | React.ReactElement
  allowStepBack?: boolean
  underTitle?: string | React.ReactElement
  error?: MessageType | string
  loading?: boolean
  onStepBack?: Function
}

export default function PageContent(props: PageContentProps) {
  return (
    <section className="PageContent-module">
      <section className="content">
        {props.title && (
          <div className="page-title">
            {props.title}
            {props.underTitle && <div className="page-under-title">{props.underTitle}</div>}

            {props.allowStepBack && (
              <ArrowLeft
                onClick={() => {
                  if (props.onStepBack) {
                    props.onStepBack()
                  }
                }}
              />
            )}
          </div>
        )}
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
