import React, { useEffect, useState } from 'react'
import './style.scss'
import UserService from 'services/user.service'
import { ScreenProps } from 'interfaces/baseIntefaces'
import PageContent from 'app/modules/common/PageContent'
import Input from 'app/components/Input'
import Button from 'app/components/Button'
import PopUp from 'app/components/PopUp'
import Message from 'app/components/Message'
import { emailErrorMessage, passwordLength, passwordMustMatch } from 'constants/auth'
import { validateEmail } from 'helpers/base'
import Tabs from 'app/components/Tabs'
import Card from 'app/modules/common/Card'

const userService = new UserService()

const TABS = {
  PERSONAL: 'Personal Info',
  COMPANY: 'Company Info',
}

const MyAccount = (props: ScreenProps) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [showChangePassword, setShowChangePassword] = useState(false)

  const [buttonLoading, setButtonLoading] = useState(false)
  const [requestError, setRequestError] = useState('')

  const [activeTab, setActiveTab] = useState('Personal Info')

  const [validationMessages, setValidationMessages] = useState({
    email: '',
    newPassword: '',
    confirmedPassword: '',
  })

  useEffect(() => {
    const currentUser = props.currentUser

    if (props.currentUser) {
      setFirstName(currentUser.first_name)
      setLastName(currentUser.last_name)
      setEmail(currentUser.email)
    }
  }, [props.currentUser])

  return (
    <div className="MyAccount-page">
      <PageContent title="My Account">
        <Card>
          <Tabs
            tabs={[TABS.PERSONAL, TABS.COMPANY]}
            activeTab={activeTab}
            onChange={tab => {
              //'Company Info' tab is disabled temporarily
              if (tab === TABS.COMPANY) {
                return
              }
              setActiveTab(tab)
            }}
          />

          {/*CONTENT*/}
          <div className={'content'}>
            <div className={'title'}>Personal Information</div>
            <div className={'inputs'}>
              <Input value={firstName} placeholder="First Name" onChange={value => setFirstName(value)} />
              <Input value={lastName} placeholder="Last Name" onChange={value => setLastName(value)} />
            </div>

            <div className={'emailInput'}>
              <Input
                value={email}
                placeholder="Email address"
                error={validationMessages.email}
                onChange={value => {
                  setValidationMessages({ ...validationMessages, email: '' })
                  setEmail(value)
                  if (value && !validateEmail(value)) {
                    setValidationMessages({ ...validationMessages, email: emailErrorMessage })
                  }
                }}
              />
            </div>
          </div>

          {/*FOOTER*/}
          <div className={'footer'}>
            {/*change password is disabled until back-end provides respective end-point for that*/}
            <Button disabled={true} onClick={() => setShowChangePassword(true)}>
              Change password
            </Button>
            <Button
              disabled={!firstName || !lastName || !email || validationMessages.email.length > 0}
              background={'MainWarning'}
              loading={buttonLoading}
              onClick={async () => {
                if (!firstName || !lastName || !email || validationMessages.email.length > 0) {
                  return
                }

                setButtonLoading(true)

                const response = await userService.editUser({
                  first_name: firstName,
                  last_name: lastName,
                  email,
                })

                if ((response && response.error) || (response && response.err_msg)) {
                  setRequestError(response.error || response.err_msg)
                  setTimeout(() => setRequestError(''), 3000)
                } else {
                  props.setCurrentUser(response)
                }

                setButtonLoading(false)
              }}
            >
              Save changes
            </Button>
          </div>
        </Card>
      </PageContent>

      <PopUp isOpen={showChangePassword} onClose={() => setShowChangePassword(false)}>
        <div className={'changePasswordModal'}>
          <div className={'modalContent'}>
            <div className={'title'}>Change Your Password</div>
            <div className={'inputs'}>
              <Input
                icon="key"
                placeholder="Current Password"
                type="password"
                value={oldPassword}
                onChange={value => setOldPassword(value)}
              />
              <Input
                icon="key"
                placeholder="NewCurrent Password"
                type="password"
                value={newPassword}
                error={validationMessages.newPassword}
                onChange={value => {
                  setValidationMessages({ ...validationMessages, newPassword: '' })
                  setNewPassword(value)
                  if (value && value.length < 6) {
                    setValidationMessages({ ...validationMessages, newPassword: passwordLength })
                  }
                }}
              />
              <Input
                icon="key"
                placeholder="Confirm Password"
                type="password"
                value={confirmedPassword}
                error={validationMessages.confirmedPassword}
                onChange={value => {
                  setValidationMessages({ ...validationMessages, confirmedPassword: '' })
                  setConfirmedPassword(value)
                  if (value !== newPassword) {
                    setValidationMessages({
                      ...validationMessages,
                      confirmedPassword: passwordMustMatch,
                    })
                  }
                }}
              />
            </div>
          </div>

          <div className={'modalFooter'}>
            <Button
              background={'MainWarning'}
              disabled={
                !oldPassword ||
                !newPassword ||
                !confirmedPassword ||
                validationMessages.newPassword.length > 0 ||
                validationMessages.confirmedPassword.length > 0
              }
            >
              Save changes
            </Button>
          </div>
        </div>
      </PopUp>

      <Message message={requestError} />
    </div>
  )
}

export default MyAccount
