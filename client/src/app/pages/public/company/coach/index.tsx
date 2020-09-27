import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { useParams } from 'react-router'
import PageContent from 'app/modules/common/PageContent'
import ImgCircle from 'app/components/ImgCircle'
import Tabs from 'app/components/Tabs'
import Card from 'app/modules/common/Card'
import Message from 'app/components/Message'
import CoachClientsModule from 'app/modules/coach/CoachClients'
import OptionsMenu from 'app/modules/company/Coach'
import CompanyService from 'services/company.service'
import { ScreenProps } from 'interfaces/baseIntefaces'
import * as baseInterfaces from 'interfaces/baseIntefaces'

const TAB_LABELS = {
  COACH_OVERVIEW: 'Coach overview',
  CLIENTS: 'Clients',
}

const companyService = new CompanyService()

export default function CompanySingleCoach(props: ScreenProps) {
  const params: any = useParams()

  const [activeTab, setActiveTab] = useState(TAB_LABELS.COACH_OVERVIEW)
  const [requestError, setRequestError] = useState()

  const [coach, setCoach] = useState()
  const [coachClients, setCoachClients] = useState()

  const getCoach = async () => {
    try {
      const res = await companyService.coaches(props.currentUser.company)

      if ((res && res.error) || res.err_msg) {
        setRequestError(res.error || res.err_msg)
        return setTimeout(() => setRequestError(''), 3000)
      }

      const c = res.find((r: baseInterfaces.Coach) => r.id === Number(params.coachId))
      setCoach(c)
    } catch (e) {
      setRequestError(e.error || e.toString())
      setTimeout(() => setRequestError(''), 3000)
    }
  }

  useEffect(() => {
    getCoach()
  }, [])

  if (!coach) {
    return null
  }

  return (
    <div className={styles['Coach-page']}>
      <PageContent title={'Coach'}>
        <Card>
          {/*HEADER*/}
          <div className={styles.header}>
            <ImgCircle size={'small'} />
            <div className={styles.name}>{coach.first_name + ' ' + coach.last_name}</div>
          </div>

          <div className={styles.optionsMenu}>
            <OptionsMenu user={coach} />
          </div>

          <Tabs
            activeTab={activeTab}
            tabs={Object.values(TAB_LABELS)}
            onChange={tab => setActiveTab(tab)}
          />

          {/*CONTENT*/}
          {activeTab === TAB_LABELS.COACH_OVERVIEW ? (
            <div className={styles.coachOverviewContent}>
              <div className={styles.rows}>
                <div className={styles.row}>
                  <span className={styles.title}>Total Revenue</span>
                  <div className={styles.value}>
                    <span>0 USD</span>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.title}>Last Payment</div>
                  <div className={styles.value}>
                    <span>0 USD</span>
                    {/*<span>August 8th 2020</span>*/}
                  </div>
                </div>
              </div>

              {/*<div className={styles.chart}>*/}
              {/*  <BarChart />*/}
              {/*</div>*/}
            </div>
          ) : (
            <div className={styles.coachClientsContent}>
              <CoachClientsModule clients={coachClients} />
            </div>
          )}
        </Card>
      </PageContent>

      <Message message={requestError} />
    </div>
  )
}

