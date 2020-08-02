import { fixClass } from '../../../../../helpers/base'
import { CircularProgressbar } from '../../../../components/CircularProgressbar'
import React from 'react'
import './style.scss'

const status_colors: any = {
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
  return (
    <div className="IsaStatus-module" onClick={props.onClick}>
      <div>
        <h2>{props.name}</h2>
        {props.status === 'paying' && (
          <p
            style={{
              color: status_colors[props.status].text,
            }}
            className={props.status}
          >
            PAYING - 5K of 20K
          </p>
        )}
        {props.status === 'completed' && (
          <p
            style={{
              color: status_colors[props.status].text,
            }}
            className={props.status}
          >
            COMPLETED - 20K
          </p>
        )}
      </div>

      <div
        className={props.status + fixClass(props.status !== 'active' && 'round')}
        style={{
          color: status_colors[props.status].text,
          background: status_colors[props.status].bg,
          borderColor: status_colors[props.status].text,
        }}
      >
        {props.status === 'paying' && (
          <CircularProgressbar
            lineColor={status_colors[props.status].text}
            textColor={status_colors[props.status].text}
            value={25}
            text={`${25}%`}
          />
        )}
        {props.status === 'completed' && (
          <CircularProgressbar
            lineColor={status_colors[props.status].text}
            textColor={status_colors[props.status].text}
            value={100}
            text={`${100}%`}
          />
        )}
        {props.status === 'active' && props.status}
      </div>
    </div>
  )
}
