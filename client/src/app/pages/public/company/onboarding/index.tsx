import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import PageHeader from '../../../../modules/common/PageHeader'
import Stepper from '../../../../modules/common/Stepper'
import Select from '../../../../components/Select/Select'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'

const on_boarding_steps = ['company details', 'link bank']

type CompanyOnBoardingKeys =
  | 'number_of_employees_estimate'
  | 'name'
  | 'address_line_1'
  | 'address_line_2'
  | 'country'
  | 'zip_code'
  | 'city'
  | 'state'

interface CompanyOnBoardingProps extends ScreenProps {}

export default function CompanyOnBoarding(props: CompanyOnBoardingProps) {
  const [active_step, set_active_step] = useState(0)
  const [data, set_data] = useState<any>({
    number_of_employees_estimate: '',
    name: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    zip_code: '',
    city: '',
    state: '',
  })

  const onChange = (e: any, key: CompanyOnBoardingKeys) => {
    set_data({ ...data, [key]: e })
  }

  const notValid = () => Object.values(data).some((v: any) => v.length === 0)

  return (
    <article className="CompanyOnBoarding-page">
      <PageContent>
        <PageHeader user={props.currentUser} />
        <h2>Register</h2>
        <section className="on_boarding-form">
          <Stepper steps={on_boarding_steps} activeIndex={active_step} />
          <div className="fields">
            <Select
              icon="globe"
              value={data.number_of_employees_estimate}
              options={['1', '2-10', '10-50', '50+']}
              onChange={e => onChange(e, 'number_of_employees_estimate')}
              placeholder="Number of people in the company"
            />
            <Input icon="building" onChange={e => onChange(e, 'name')} value={data.name} placeholder="Company Name" />
            <Input
              icon="location"
              onChange={e => onChange(e, 'address_line_1')}
              value={data.address_line_1}
              placeholder="Address Line 1"
            />
            <Input
              icon="location"
              onChange={e => onChange(e, 'address_line_2')}
              value={data.address_line_2}
              placeholder="Address Line 2"
            />
            <Input icon="globus" onChange={e => onChange(e, 'country')} value={data.country} placeholder="Country" />
            <div className="zip-code">
              <Input onChange={e => onChange(e, 'zip_code')} value={data.zip_code} placeholder="Zip Code" />
              <Input onChange={e => onChange(e, 'city')} value={data.city} placeholder="City" />
              <Input onChange={e => onChange(e, 'state')} value={data.state} placeholder="State" />
            </div>
          </div>
          <footer>
            <Button disabled={notValid()} background="MainWarning" icon="arrow-right">
              NEXT
            </Button>
          </footer>
        </section>
      </PageContent>
    </article>
  )
}