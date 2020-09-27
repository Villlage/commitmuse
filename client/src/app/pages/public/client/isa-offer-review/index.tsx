import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import FAQ from '../../../../modules/company/CreateIsa/FAQ'
import ISACalculator from '../../../../modules/on-boarding/ISACalculator'
import Field from '../../../../components/Field'
import IsaAssessment from '../../../../modules/common/IsaAssessment'
import Button from '../../../../components/Button'

interface IsaOfferReviewProps extends ScreenProps {}

export default function IsaOfferReview(props: IsaOfferReviewProps) {
  return (
    <article className="IsaOfferReview-page">
      <PageContent title="Review Your ISA Offer">
        <section className="offer">
          <header>
            <div className="logo">
              <img src="/web/assets/images/oxford_logo.png" alt="oxford_logo" />
              <div>
                <h2>Amy Owens</h2>
                <p>amyownes@gmail.com</p>
              </div>
            </div>

            <div className="fields">
              <Field title="TO">Jonah Serna</Field>
              <Field>{''}</Field>
              <Field title="Job Field">Data Science</Field>
              <Field title="Program  Duration">5 Months</Field>
              <Field title="Current income">$95K / YEAR</Field>
              <Field title="Future income">$125K / YEAR</Field>
              <Field title="ISA PRICING">From new raise</Field>
              <Field title="Percentage to be paid">16%</Field>
              <Field title="Description" className="full">
                Our goal is to get a senior PM role at the end of the training program. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Field>
            </div>

            <IsaAssessment />
          </header>
          <div className="select-plan">
            <h2>Select your payment Plan</h2>
            <div className="plans">
              <div className="plan">
                <h2>Single</h2>
                <p>
                  $5,000 <span>usd</span>
                </p>
                <p>
                  <i>1</i>Upfront payment of $5,000
                </p>
                <p>Make a single upfront payment and get a huge discount on your ISA.</p>
                <Button>Select Plan</Button>
              </div>
              <div className="plan">
                <h2>combined</h2>
                <p>
                  $7,000 <span>usd</span>
                </p>
                <p>
                  <i>1</i>Upfront payment of $3,500
                </p>
                <p>
                  <i>1</i>Split payments of $500
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit.</p>
                <Button>Select Plan</Button>
              </div>
              <div className="plan">
                <h2>Split</h2>
                <p>
                  $8,000 <span>usd</span>
                </p>
                <p>
                  <i>16</i>Split payments of $500
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit.</p>
                <Button>Select Plan</Button>
              </div>
            </div>

            <div className="plan-desc">
              <h2>Combined Plan</h2>
              <div className="plan-carousel">
                <div>
                  <h2>Upfront Payment</h2>
                  <p>
                    January, <span>2020</span>
                  </p>
                  <p>
                    $3,500 <span>USD</span>
                  </p>
                </div>
                <div>
                  <h2>
                    1st <span>split Payment</span>
                  </h2>
                  <p>
                    February, <span>2020</span>
                  </p>
                  <p>
                    $500 <span>USD</span>
                  </p>
                </div>
                <div>
                  <h2>
                    2nd <span>split Payment</span>
                  </h2>
                  <p>
                    March, <span>2020</span>
                  </p>
                  <p>
                    $500 <span>USD</span>
                  </p>
                </div>
                <div>
                  <h2>
                    3rd <span>split Payment</span>
                  </h2>
                  <p>
                    May, <span>2020</span>
                  </p>
                  <p>
                    $500 <span>USD</span>
                  </p>
                </div>
                <div>
                  <h2>
                    4th <span>split Payment</span>
                  </h2>
                  <p>
                    June, <span>2020</span>
                  </p>
                  <p>
                    $500 <span>USD</span>
                  </p>
                </div>
              </div>

              <div className="offer-actions">
                <h2>You can cancel your offer within two weeks of accepting it.</h2>
                <Button>DOWNLOAD CONTRACT</Button>
                <Button>ACCEPT OFFER</Button>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <FAQ />
          <ISACalculator current_income={1} percentage={1} months={1} max={1} />
        </footer>
      </PageContent>
    </article>
  )
}
