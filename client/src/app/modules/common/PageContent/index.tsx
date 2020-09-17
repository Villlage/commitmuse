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
  onStepBack?: Function
}

export default function PageContent(props: PageContentProps) {
  const { title, underTitle, allowStepBack, error, children, onStepBack } = props

  return (
    <section className={'PageContent-module'}>
      <section className={'content'}>
        {title && (
          <div className={'page-title'}>
            {title}
            {underTitle && <div className={'page-under-title'}>{underTitle}</div>}

            {allowStepBack && (
              <ArrowLeft
                onClick={() => {
                  if (onStepBack) {
                    onStepBack()
                  }
                }}
              />
            )}
          </div>
        )}
        {children}
      </section>
      <Message message={error || ''} />
    </section>
  )
}
