import React from 'react'
import './style.scss'
import { fixClass } from '../../../helpers/base'

interface FieldProps {
  children: any
  title: string
  className?: string
}

export default function Field(props: FieldProps) {
  return (
    <div className={`Field-component${fixClass(props.className)}`}>
      <label>{props.title}</label>
      <p>{props.children}</p>
    </div>
  )
}