import React from 'react'
import './style.scss'

const status_colors: any = {
  created: {
    bg: '#C6F7E2',
    text: '#147D64',
  },
  active: {
    bg: '#C6F7E2',
    text: '#147D64',
  },
  paying: {
    bg: '#FFF3C4',
    text: '#CB6E17',
  },
  completed: {
    bg: '#BAE3FF',
    text: '#0967D2',
  },
}

type IsaStatusProps = {
  status: any
  name: string
  onClick(): void
}

export default function IsaStatus(props: IsaStatusProps) {
  const status = props.status || 'created'
  return (
    <div className="IsaStatus-module" onClick={props.onClick}>
      <div>
        <h2>{props.name}</h2>
        {status === 'paying' && (
          <p
            style={{
              color: status_colors[status].text,
            }}
            className={status}
          >
            PAYING - 5K of 20K
          </p>
        )}
        {status === 'completed' && (
          <p
            style={{
              color: status_colors[status].text,
            }}
            className={status}
          >
            COMPLETED - 20K
          </p>
        )}
      </div>

      <div
        // className={status + fixClass(status !== 'active' && 'round')}
        className={status}
        style={{
          color: status_colors[status] ? status_colors[status].text : status_colors.status_colors.text,
          background: status_colors[status] ? status_colors[status].bg : status_colors.status_colors.text,
          borderColor: status_colors[status] ? status_colors[status].text : status_colors.status_colors.text,
        }}
      >
        {/*{status === 'paying' && (*/}
        {/*  <CircularProgressbar*/}
        {/*    lineColor={status_colors[status].text}*/}
        {/*    textColor={status_colors[status].text}*/}
        {/*    value={25}*/}
        {/*    text={`${25}%`}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{status === 'completed' && (*/}
        {/*  <CircularProgressbar*/}
        {/*    lineColor={status_colors[status].text}*/}
        {/*    textColor={status_colors[status].text}*/}
        {/*    value={100}*/}
        {/*    text={`${100}%`}*/}
        {/*  />*/}
        {/*)}*/}
        {status}
      </div>
    </div>
  )
}
