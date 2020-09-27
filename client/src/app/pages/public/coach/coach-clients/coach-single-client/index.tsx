import React, { useState } from 'react'
import styles from './style.module.scss'
import PageContent from 'app/modules/common/PageContent'
import ImgCircle from 'app/components/ImgCircle'
import Tabs from 'app/components/Tabs'
import Card from 'app/modules/common/Card'
import BarChart from 'app/modules/common/BarChart'
import { useHistory } from 'react-router'

const TAB_LABELS = {
  CLIENT_OVERVIEW: 'Client overview',
  ISA_OFFER: 'ISA offer',
}

export default function CoachSingleClient() {
  const history = useHistory()

  const [activeTab, setActiveTab] = useState(TAB_LABELS.CLIENT_OVERVIEW)

  return (
    <div className={styles['CoachClient-page']}>
      <PageContent
        title={'Client'}
        underTitle={'by Amy Owens'}
        allowStepBack={true}
        onStepBack={() => history.push(`/company/coaches/25`)}
      >
        <Card>
          {/*HEADER*/}
          <div className={styles.header}>
            <ImgCircle src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" size={'small'} />
            <div className={styles.name}>Johan Serna</div>
          </div>

          <Tabs activeTab={activeTab} tabs={Object.values(TAB_LABELS)} onChange={tab => setActiveTab(tab)} />

          {/*CONTENT*/}
          {activeTab === TAB_LABELS.CLIENT_OVERVIEW ? (
            <div className={styles.clientOverviewContent}>
              <div className={styles.rows}>
                <div className={styles.row}>
                  <span className={styles.title}>Total Paid</span>
                  <div className={styles.value}>
                    <span>5,000 USD</span>
                    <span>of 25,000 USD</span>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.title}>Last Payment</div>
                  <div className={styles.value}>
                    <span>5,000 USD</span>
                    <span>August 8th 2020</span>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.title}>Previous Income</div>
                  <div className={styles.value}>
                    <span>95K / YEAR</span>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.title}>Current Income</div>
                  <div className={styles.value}>
                    <span>125K / YEAR</span>
                    <span>Last verified: August 8th 2020</span>
                  </div>
                </div>
              </div>

              <div className={styles.chart}>
                <BarChart />
              </div>
            </div>
          ) : (
            <div className={styles.isaOffer}></div>
          )}
        </Card>
      </PageContent>
    </div>
  )
}

