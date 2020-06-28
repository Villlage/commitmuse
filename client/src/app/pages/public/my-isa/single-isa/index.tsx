import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import ISACalculator from '../../../../modules/on-boarding/ISACalculator'
import PageHeader from '../../../../modules/common/PageHeader'
import Status from '../../../../modules/common/Status'

interface SingleIsaProps extends ScreenProps {}

export default function SingleIsa(props: SingleIsaProps) {
  const [current_income, set_current_income] = useState(95)
  const [future_income, set_future_income] = useState(125)
  return (
    <article className="SingleIsa-page">
      <PageHeader user={props.currentUser} />
      <section className="content">
        <section className="isa-offer">
          <header>
            <h2>ISA Offer</h2>
          </header>
          <Status selected="paying" />
          <div className="offer-body">
            <p>
              <span>Coach</span> Amy Owens
            </p>
            <p>
              <span>current income</span> $95K / YEAR
            </p>
            <p>
              <span>Student</span> Jonah Serna
            </p>
            <p>
              <span>target income</span> $125K / YEAR
            </p>
            <p>
              <span>Description</span> Get a senior PM role
            </p>
          </div>
          <footer>
            <button className="pdf">DOWNLOAD PDF</button>
            <button className="accept">accept Offer</button>
          </footer>
        </section>
        <ISACalculator
          current_income={current_income}
          future_income={future_income}
          incomeChange={e => set_current_income(e)}
          futureChange={e => set_future_income(e)}
        />
      </section>
    </article>
  )
}
