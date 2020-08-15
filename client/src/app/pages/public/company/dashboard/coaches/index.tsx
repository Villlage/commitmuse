import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../../modules/common/PageContent'
import MenuSideBar from '../../../../../modules/company/MenuSideBar'
import Icon from '../../../../../components/Icon'
import Button from '../../../../../components/Button'
import PopUp from '../../../../../components/PopUp'
import Input from '../../../../../components/Input'
import Select from '../../../../../components/Select/Select'

interface CompanyCoachesProps extends ScreenProps {}

export default function CompanyCoaches(props: CompanyCoachesProps) {
  const [coaches, set_coaches] = useState([{ name: 'Amy Owens', role: 'coach' }])
  const [show_new_coach_popup, set_show_new_coach_popup] = useState(false)
  return (
    <article className="CompanyCoaches-page">
      <MenuSideBar />
      <PageContent>
        <header>
          <h2 className="page-title">Coaches</h2>
          <Button background="MainWarning" onClick={() => set_show_new_coach_popup(true)}>
            <Icon icon="plus" /> New Coach
          </Button>
        </header>
        <section className="coaches">
          {[...coaches, ...coaches, ...coaches, ...coaches].map((coach, i) => (
            <div className="coach" key={i}>
              <div>
                <Icon icon="emy_owens" />
                <h2>
                  {coach.role} <span>{coach.name}</span>
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
              <Input onChange={e => e} value={''} placeholder="First Name" />
              <Input onChange={e => e} value={''} placeholder="Email Address" />
              <Button background="MainWarning">SEND INVITE</Button>
            </header>
            <footer>
              {[...coaches, ...coaches, ...coaches, ...coaches].map((coach, i) => (
                <div className="coach" key={i}>
                  <h2>
                    John <span>johnsmith@email.com</span>
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