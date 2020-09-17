import React from 'react'
import styles from './style.module.scss'
import { IconsSvg } from 'icons'
import ProgressCircle from 'app/components/ProgressCircle'
import { useHistory } from 'react-router'

const CoachClientsModule = () => {
  const history = useHistory()

  const UserIcon = IconsSvg.Account
  const FileIcon = IconsSvg.FileContract
  const ArrowRightIcon = IconsSvg.ArrowRight

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
        <div className={styles.row} onClick={() => history.push(`/company/coaches/25/clients/1`)}>
          <img src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" className={styles.avatar} />
          <div className={styles.personalInfo}>
            <div className={styles.name}>Jonah Serna</div>
            <div className={styles.payment}>Paying - 5K of 20K </div>
          </div>
          <ProgressCircle progress={50} />
          <ArrowRightIcon />
        </div>

        <div className={styles.row}>
          <img src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" className={styles.avatar} />
          <div className={styles.personalInfo}>
            <div className={styles.name}>Jonah Serna</div>
            <div className={styles.payment}>Paying - 5K of 20K </div>
          </div>
          <ProgressCircle progress={25} />
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  )
}

export default CoachClientsModule
