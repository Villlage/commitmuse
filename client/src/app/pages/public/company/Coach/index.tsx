import React, { useState } from 'react'
import styles from './style.module.scss'
import PageContent from 'app/modules/common/PageContent'
import ImgCircle from 'app/components/ImgCircle'
import Tabs from 'app/components/Tabs'
import Card from 'app/modules/common/Card'
import CoachClientsModule from 'app/modules/coach/CoachClients'
import OptionsMenu from './OptionsMenu'
import BarChart from 'app/modules/common/BarChart'

const TAB_LABELS = {
  COACH_OVERVIEW: 'Coach overview',
  CLIENTS: 'Clients',
}

const Coach = () => {
  const [activeTab, setActiveTab] = useState(TAB_LABELS.COACH_OVERVIEW)

  return (
    <div className={styles['Coach-page']}>
      <PageContent title={'Coach'}>
        <Card>
          {/*HEADER*/}
          <div className={styles.header}>
            <ImgCircle src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" size={'small'} />
            <div className={styles.name}>Amy Owens</div>
          </div>

          <div className={styles.optionsMenu}>
            <OptionsMenu />
          </div>

          <Tabs activeTab={activeTab} tabs={Object.values(TAB_LABELS)} onChange={tab => setActiveTab(tab)} />

          {/*CONTENT*/}
          {activeTab === TAB_LABELS.COACH_OVERVIEW ? (
            <div className={styles.coachOverviewContent}>
              <div className={styles.rows}>
                <div className={styles.row}>
                  <span className={styles.title}>Total Revenue</span>
                  <div className={styles.value}>
                    <span>5,000 USD</span>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.title}>Last Payment</div>
                  <div className={styles.value}>
                    <span>5,000 USD</span>
                    <span>August 8th 2020</span>
                  </div>
                </div>
              </div>

              <div className={styles.chart}>
                <BarChart />
              </div>
            </div>
          ) : (
            <div className={styles.coachClientsContent}>
              <CoachClientsModule />
            </div>
          )}
        </Card>
      </PageContent>
    </div>
  )
}

export default Coach
