import React, { useState } from 'react'
import './style.scss'
import { PlaidMetadata, ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Stepper from '../../../../modules/common/Stepper'
import Select from '../../../../components/Select/Select'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import CompanyService from '../../../../../services/company.service'
import Message from '../../../../components/Message'
import { usePlaidLink } from 'react-plaid-link'
import PlaidService from '../../../../../services/plaid.service'
import { log } from '../../../../../services/logging.service'
import currentEnv from '../../../../../config/environment'

const companyService = new CompanyService()
const plaidService = new PlaidService()

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
  const [request_error, set_request_error] = useState('')
  const [active_step, set_active_step] = useState(0)
  const [data, set_data] = useState({
    number_of_employees_estimate: '1',
    name: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    zip_code: '',
    city: '',
    state: '',
  })

  const notValid = () => {
    const { address_line_2, ...rest } = data
    return Object.values(rest).some((v: any) => v.length === 0)
  }

  const onSuccess = async (token: string, metadata: PlaidMetadata) => {
    try {
      const companyId = localStorage.getItem('companyId')
      const res = await plaidService.createCompanyItem(token, metadata, companyId as string)
      if (res) {
        const error = res.error || res.err_msg

        if (error) {
          set_request_error(res.error)
          return setTimeout(() => set_request_error(''), 3000)
        }
        localStorage.removeItem('companyId')

        props.history.push(`/subscription/${companyId}`)
      }
    } catch (e) {
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const config = {
    clientName: 'Commit Muse',
    env: currentEnv().PLAID_ENV,
    product: ['auth', 'transactions'],
    publicKey: currentEnv().PLAID_PUBLIC_KEY,
    onSuccess: onSuccess,
    token: props.plaid_token
  }

  const { open } = usePlaidLink(config)

  const onRegister = async () => {
    try {
      const res = await companyService.create({
        name: data.name,
        number_of_employees_estimate: data.number_of_employees_estimate,
        address: `${data.address_line_1}, ${data.address_line_2}, ${data.country}, ${data.city}, ${data.state}, ${data.zip_code}`,
      })

      if ((res && res.error) || res.err_msg) {
        log(res)
        set_request_error(res.error || res.err_msg)
        return setTimeout(() => set_request_error(''), 3000)
      }
      localStorage.setItem('companyId', res.id)
      await props.fetchUser()

      set_active_step(active_step + 1)
      open()
    } catch (e) {
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  const onChange = (e: any, key: CompanyOnBoardingKeys) => {
    set_data({ ...data, [key]: e })
  }

  const boarding_steps: any = {
    0: (
      <>
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
          <Button disabled={notValid()} onClick={onRegister} background="MainWarning" icon="arrow-right">
            NEXT
          </Button>
        </footer>
      </>
    ),
    1: (
      <section className="link_bank">
        <Button background="MainWarning" onClick={() => open()}>
          Link Bank
        </Button>
        <Button className="skip" onClick={() => props.history.push(`/subscription/${props.currentUser.company}`)}>
          Skip for later
        </Button>
      </section>
    ),
  }

  return (
    <article className="CompanyOnBoarding-page">
      <PageContent>
        <h2>Register</h2>
        <section className="on_boarding-form">
          <Stepper steps={on_boarding_steps} activeIndex={active_step} />
          {boarding_steps[active_step]}
          <Message message={request_error} />
        </section>
      </PageContent>
    </article>
  )
}
