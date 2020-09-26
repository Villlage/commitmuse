import React from 'react'
import styles from './style.module.scss'
import { useHistory } from 'react-router'
import { IconsSvg } from 'icons'
import ProgressCircle from 'app/components/ProgressCircle'
import ImgCircle from 'app/components/ImgCircle'

interface CoachClientsModuleProps {
  coachId?: number
  clients?: Array<any>
}

const CoachClientsModule = ({ coachId, clients }: CoachClientsModuleProps) => {
  const history = useHistory()

  const UserIcon = IconsSvg.Account
  const FileIcon = IconsSvg.FileContract
  const ArrowRightIcon = IconsSvg.ArrowRight

  if (!clients) {
    return null
  }

  return (
    <div className={styles['CoachClients-module']}>
      {/*HEADER*/}
      <header>
        <div className={styles.left}>
          <div>
            <span>2</span>
            <span>CLIENTS</span>
          </div>
          <div className={styles.icon}>
            <UserIcon />
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <span>2</span>
            <span>PROCESSES</span>
          </div>
          <div className={styles.icon}>
            <FileIcon />
          </div>
        </div>
      </header>

      {/*CONTENT*/}
      <div className={styles.content}>
        {clients.map((client, index) => (
          <div
            className={styles.row}
            key={`coachClient-${index}`}
            onClick={() => history.push(`/company/coaches/${coachId}/clients/${client.id}`)}
          >
            <ImgCircle size={'large'} />
            <div className={styles.personalInfo}>
              <div className={styles.name}>{client.first_name}</div>
              <div className={styles.payment}>Paying - 5K of 20K </div>
            </div>
            <ProgressCircle progress={50} />
            <ArrowRightIcon />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoachClientsModule
