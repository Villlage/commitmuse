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
import { makeName, notEmptyArray } from '../../../../../../helpers/base'

const companyService = new CompanyService()

interface CompanyCoachesProps extends ScreenProps {}

export default function CompanyCoaches(props: CompanyCoachesProps) {
  const [loading, set_loading] = useState<boolean>(true)
  const [request_error, set_request_error] = useState<any>('')
  const [coaches, set_coaches] = useState<Coach[]>([])
  const [show_new_coach_popup, set_show_new_coach_popup] = useState(false)
  const [coach, set_coach] = useState({
    first_name: '',
    email: '',
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

  useLayoutEffect(() => {
    getCoaches()
  }, [])

  return (
    <article className="CompanyCoaches-page">
      <MenuSideBar />
      <PageContent error={request_error}>
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
              <h2>Invite someone to join Company Name</h2>
              <Input
                onChange={e => set_coach({ ...coach, first_name: e })}
                value={coach.first_name}
                placeholder="First Name"
              />
              <Input
                onChange={e => set_coach({ ...coach, email: e })}
                value={coach.email}
                placeholder="Email Address"
              />
              <Button background="MainWarning">SEND INVITE</Button>
            </header>
            <footer>
              {coaches.map((coach, i) => (
                <div className="coach" key={i}>
                  <h2>
                    {makeName(coach)} <span>{coach.email}</span>
                  </h2>
                  <Select value="Coach" options={['']} onChange={e => e} placeholder="Coach" />
                </div>
              ))}
            </footer>
          </section>
        </PopUp>
      </PageContent>
    </article>
  )
}
