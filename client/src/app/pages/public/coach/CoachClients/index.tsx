import React from 'react'
import styles from './styles.module.scss'
import PageContent from 'app/modules/common/PageContent'
import Card from 'app/modules/common/Card'
import CoachClientsModule from 'app/modules/coach/CoachClients'

export default function CoachClients() {
  //don't render the page until mock-data replaced with real data
  return null

  return (
    <article className={styles['CoachClients-page']}>
      <PageContent title="Clients">
        <Card>
          <CoachClientsModule />
        </Card>
      </PageContent>
    </article>
  )
}
