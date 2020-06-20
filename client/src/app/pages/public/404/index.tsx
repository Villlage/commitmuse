import React from 'react'
import './style.scss'

export default function NotFound(props: any) {
  return (
    <section className="NotFound-page">
      <h1>This page doesn't exist</h1>
      <h2>Check your link please</h2>
      <button onClick={() => props.history.goBack()}>Go back</button>
    </section>
  )
}
