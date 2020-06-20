import React, { CSSProperties } from 'react'
import './style.scss'

interface StatusesProps {
  list: string[]
  style?: CSSProperties
}

export default function Statuses(props: StatusesProps) {
  return (
    <div className="Statuses-component" style={props.style}>
      {props.list &&
        props.list.map((item, index) => (
          <div className="status" key={index}>
            {item}
          </div>
        ))}
    </div>
  )
}
