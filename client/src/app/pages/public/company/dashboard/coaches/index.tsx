import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { Coach, ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../../modules/common/PageContent'
import MenuSideBar from '../../../../../modules/company/MenuSideBar'
import Icon from '../../../../../components/Icon'
import Button from '../../../../../components/Button'
import PopUp from '../../../../../components/PopUp'
import Input from '../../../../../components/Input'
import Select from '../../../../../components/Select/Select'
import CompanyService from '../../../../../../services/company.service'
import Message from '../../../../../components/Message'
import { makeName, notEmptyArray, validateEmail } from '../../../../../../helpers/base'
import { emailErrorMessage } from '../../../../../../constants/auth'

const companyService = new CompanyService()

interface CompanyCoachesProps extends ScreenProps {}

export default function CompanyCoaches(props: CompanyCoachesProps) {
  const [loading, set_loading] = useState<boolean>(true)
  const [request_error, set_request_error] = useState<any>('')
  const [email_error, set_email_error] = useState<any>('')
  const [coaches, set_coaches] = useState<Coach[]>([])
  const [show_new_coach_popup, set_show_new_coach_popup] = useState(false)
  const [coach, set_coach] = useState({
    first_name: '',
    last_name: '',
    email: '',
    user_role: 'coach',
  })

  const getCoaches = async () => {
    try {
      const res = await companyService.coaches(props.currentUser.company)
      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        return setTimeout(() => set_request_error(''), 3000)
      }

      set_coaches(res)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const invite = async () => {
    set_loading(true)

    try {
      const res = await companyService.inviteCoach(props.currentUser.company, {
        ...coach,
        user_role: coach.user_role === 'coach' ? 0 : 1,
      })

      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        return setTimeout(() => set_request_error(''), 3000)
      }

      set_show_new_coach_popup(false)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    getCoaches()
  }, [])

  const notValid = () => Object.values(coach).some(i => i.length < 1)

  return (
    <article className="CompanyCoaches-page">
      <PageContent>
        <header>
          <h2 className="page-title">Coaches</h2>
          <Button background="MainWarning" onClick={() => set_show_new_coach_popup(true)}>
            <Icon icon="plus" /> New Coach
          </Button>
        </header>
        <section className="coaches">
          {notEmptyArray(coaches) &&
            coaches.map((coach, i) => (
              <div className="coach" key={i}>
                <div>
                  <Icon icon="person" />
                  <h2>
                    {coach.type} <span>{makeName(coach)}</span>
                  </h2>
                </div>
                <Icon icon="chevron-right" />
              </div>
            ))}
        </section>
        <PopUp isOpen={show_new_coach_popup} onClose={() => set_show_new_coach_popup(false)}>
          <section className="new-coach">
            <header>
              <h2>Invite someone to join as coach</h2>
              <Input
                onChange={e => set_coach({ ...coach, first_name: e })}
                value={coach.first_name}
                placeholder="First Name"
              />
              <Input
                onChange={e => set_coach({ ...coach, last_name: e })}
                value={coach.last_name}
                placeholder="Last Name"
              />
              <Input
                value={coach.email}
                onChange={e => {
                  set_email_error('')
                  set_coach({ ...coach, email: e })
                  !validateEmail(e) && set_email_error(emailErrorMessage)
                }}
                error={email_error}
                placeholder="Email Address"
              />
              <div className="half">
                <Select
                  value={coach.user_role}
                  options={['coach', 'admin']}
                  onChange={e => set_coach({ ...coach, user_role: e })}
                  placeholder="Select type"
                />
                <Button onClick={invite} disabled={notValid()} loading={loading} background="MainWarning">
                  SEND INVITE
                </Button>
              </div>
            </header>
          </section>
          <Message message={request_error} />
        </PopUp>
      </PageContent>
    </article>
  )
}
