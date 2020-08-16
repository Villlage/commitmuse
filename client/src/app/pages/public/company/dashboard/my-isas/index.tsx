import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ISA, ScreenProps } from '../../../../../../interfaces/baseIntefaces'
import MenuSideBar from '../../../../../modules/company/MenuSideBar'
import PageContent from '../../../../../modules/common/PageContent'
import Icon from '../../../../../components/Icon'
import { notEmptyArray } from '../../../../../../helpers/base'
import CompanyService from '../../../../../../services/company.service'
import Loader from '../../../../../components/Loader'
import Select from '../../../../../components/Select/Select'
import IsaStatus from '../../../../../modules/company/MyIsa/IsaStatus'
import { Link } from 'react-router-dom'
import PlaidService from '../../../../../../services/plaid.service'
import Button from '../../../../../components/Button'

const companyService = new CompanyService()
const plaidService = new PlaidService()

interface CompanyIsasProps extends ScreenProps {}

export default function CompanyIsas(props: CompanyIsasProps) {
  const [filter, set_filter] = useState('')
  const [loading, set_loading] = useState<boolean>(true)
  const [request_error, set_request_error] = useState<any>('')
  const [cant_create, set_cant_create] = useState(true)
  const [isas, set_isas] = useState<ISA[]>([])

  const getIsas = async () => {
    try {
      const res = await companyService.isas(props.currentUser.company)
      const mask = await plaidService.getMask(props.currentUser.company)
      set_cant_create(!mask)
      set_loading(false)

      if ((res && res.error) || res.err_msg) {
        set_request_error(res.error || res.err_msg)
        return setTimeout(() => set_request_error(''), 3000)
      }

      set_isas(res)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    getIsas()
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <article className="CompanyIsas-page">
      <MenuSideBar />
      <PageContent error={request_error}>
        <header className="page-header">
          <h1 className="page-title">My ISA’s</h1>
          {notEmptyArray(isas) && (
            <Select
              value={filter}
              options={['View all', 'active', 'paying', 'completed']}
              onChange={e => set_filter(e)}
              placeholder={'View all'}
            />
          )}
        </header>
        {notEmptyArray(isas) ? (
          <section className="my_isa">
            {isas
              .filter((i: any) => i.status.includes(filter === 'View all' ? '' : filter))
              .map((isa: any, index: number) => (
                <IsaStatus
                  onClick={() => props.history.push('isas/' + isa.id)}
                  key={index}
                  name={isa.student.first_name + ' ' + isa.student.last_name}
                  status={isa.status}
                />
              ))}
            <Link to="isas/create" className="new_isa">
              <Icon icon="new_isa_plus" />
              NEW ISA
            </Link>
          </section>
        ) : (
          <section className="empty-isa">
            <div className="icon">
              <Icon icon="empty_isa" />
            </div>
            <h2>You have no ISA offers.</h2>
            <div className="text_with_icon">
              <p>Start by creating a new one.</p>
              <Icon icon="arrow_to_button" />
            </div>
            <Button disabled={cant_create} className="new_isa">
              <Icon icon="new_isa_plus" />
              NEW ISA
            </Button>
          </section>
        )}
      </PageContent>
    </article>
  )
}
