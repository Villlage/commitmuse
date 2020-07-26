import React from 'react'
import './style.scss'
import ExpansionPanel from '../../../../components/ExpansionPanel'

interface FAQProps {}

const FAQs = [
  {
    title: 'How it works',
    isOpen: true,
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
          <br />
          <br />
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <img src="/assets/icons/calc.svg" alt="calc" />
      </>
    ),
  },
  {
    title: 'What happens if I cancel',
    content: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
    ),
  },
  {
    title: 'How it works',
    content: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
    ),
  },
  {
    title: 'What happens if I cancel',
    content: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
    ),
  },
]

export default function FAQ(props: FAQProps) {
  return (
    <section className="FAQ-module">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {FAQs.map((faq, i) => (
        <ExpansionPanel key={i} title={faq.title} content={faq.content} isOpen={faq.isOpen} />
      ))}
    </section>
  )
}