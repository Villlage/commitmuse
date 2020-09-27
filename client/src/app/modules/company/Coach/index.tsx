import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import { ReactComponent as ArrowRight } from 'icons/arrow-right.svg'
import { ReactComponent as ArrowLeft } from 'icons/arrow-left.svg'
import { ReactComponent as Trash } from 'icons/trash.svg'
import { ReactComponent as CheckMark } from 'icons/check-mark.svg'
import { USER_TYPES } from 'constants/userTypes'
import { Coach } from 'interfaces/baseIntefaces'

interface OptionsMenuProps {
  user: Coach
}

export default function OptionsMenu({ user }: OptionsMenuProps) {
  const [flyoutIsOpen, setFlyOutIsOpen] = useState(false)
  const [roleClicked, setRoleClicked] = useState(false)

  useEffect(() => {
    return () => {
      setRoleClicked(false)
    }
  }, [])

  const handleClose = () => {
    setRoleClicked(false)
    setFlyOutIsOpen(false)
  }

  return (
    <div className={styles.optionsMenuContainer} tabIndex={0} onBlur={handleClose}>
      <div className={classNames(styles.optionsMenu, { [styles.active]: flyoutIsOpen })}>
        <div
          className={styles.optionsLabel}
          onClick={() => {
            if (!flyoutIsOpen) {
              setFlyOutIsOpen(true)
            } else {
              handleClose()
            }
          }}
        >
          ...
        </div>

        {flyoutIsOpen && (
          <div className={styles.flyout}>
            {roleClicked ? (
              <>
                <div className={styles.more} onClick={() => setRoleClicked(false)}>
                  <ArrowLeft />
                  <span>Role</span>
                </div>
                <div className={styles.content}>
                  <div className={styles.roleBlock}>
                    <div className={styles.left}>
                      <div className={styles.value}>
                        {(user && user.user_type) ? USER_TYPES[user.user_type] : ''}
                      </div>
                    </div>
                    <CheckMark />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.more}>More</div>
                <div className={styles.content}>
                  <div className={styles.roleBlock} onClick={() => setRoleClicked(true)}>
                    <div className={styles.left}>
                      <div className={styles.title}>Role</div>
                      <div className={styles.value}>{(user && user.user_type) ? USER_TYPES[user.user_type] : ''}</div>
                    </div>
                    <ArrowRight />
                  </div>

                  <div className={styles.deleteUser}>
                    <Trash />
                    <span>Remove user</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

