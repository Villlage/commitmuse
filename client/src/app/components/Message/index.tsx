import * as React from 'react'
import './style.scss'
import { fixClass } from '../../../helpers/base'

type MessageType = {
  type: 'alert' | 'info'
  text: string
}

interface MessageProps {
  message: MessageType | string
  background?: string
  static?: boolean
  onClick?: () => void
}

const Message = (props: MessageProps) => {
  return typeof props.message === 'string' ? (
    <div
      className={`Message-component alert${fixClass(props.static && 'static')}`}
      style={props.background ? { background: props.background } : {}}
    >
      {props.message}
    </div>
  ) : (
    <div className={`Message-component info${fixClass(props.static && 'static')}`}>
      <h2>Info</h2>
      <p>{props.message.text}</p>
      {props.onClick && (
        <div>
          <button onClick={props.onClick}>OK</button>
        </div>
      )}
    </div>
  )
}

export default Message
