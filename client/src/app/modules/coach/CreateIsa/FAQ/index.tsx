import React from 'react'
import './style.scss'
import ExpansionPanel from '../../../../components/ExpansionPanel'

interface FAQProps {}

const FAQs = [
  {
    title: 'How does it work?',
    isOpen: true,
    content: (
      <>
        <p>
          Income Share Agreements (ISAs) relieve the upfront financial burden of a student. The educator agrees to a
          contract where the student does not pay tuition until they secure a salary. Then, a fixed percentage of their
          income is paid to the educator via the app for a fixed duration. It is not a traditional loan or grant, and
          there is no principal balance or interest rate.
        </p>
        <img src="/assets/icons/calc.svg" alt="calc" />
      </>
    ),
  },
  {
    title: 'Am I allowed to cancel the ISA?',
    content: (
      <p>
        There is an allotted cancellation period that the student is allowed to utilize in the case that they choose to
        cancel the contract. After that allotment, the contract can only be cancelled if the educator agrees to it.
      </p>
    ),
  },
  {
    title: 'May I repay my ISA early?',
    content: <p>The ISA may be prepaid by paying the total payment cap that is stated in your disclosure.</p>,
  },
  {
    title: 'Can someone hide their payments from me and pay less or not pay at all?',
    content: (
      <p>
        Commit Muse will validate the student’s bank account as well as verify their income and taxes before the ISA is
        complete. Therefore, they will not be able to hide or skip payments.
      </p>
    ),
  },
  {
    title: "What happens when someone doesn't pay the ISA?",
    content: (
      <p>
        There is always a possibility of bad actors even if we take every precaution against them. In this case, we have
        collection agencies who will ensure the money reaches the educator. For any further concerns, we would be happy
        to talk!
      </p>
    ),
  },
  {
    title: 'Is it legal?',
    content: (
      <p>
        ISAs are 100% legal. According to CareerKarma, more than $500 million in ISAs will be generated in 2020 alone.
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