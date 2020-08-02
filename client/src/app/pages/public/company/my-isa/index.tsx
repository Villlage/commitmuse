import React, { useLayoutEffect, useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../modules/common/PageHeader'
import Icon from '../../../../components/Icon'
import { notEmptyArray } from '../../../../../helpers/base'
import IsaService from '../../../../../services/isa.service'
import PageContent from '../../../../modules/common/PageContent'
import { Link } from 'react-router-dom'
import IsaStatus from '../../../../modules/company/MyIsa/IsaStatus'
import Select from '../../../../components/Select/Select'
import Message from '../../../../components/Message'
import Loader from '../../../../components/Loader'

const isaService = new IsaService()

interface MyIsa extends ScreenProps {}

export default function MyIsa(props: MyIsa) {
  const [filter, set_filter] = useState('')
  const [isas, set_isas] = useState<any[]>([])
  const [request_error, set_request_error] = useState('')
  const [loading, set_loading] = useState(true)

  const getIsas = async () => {
    set_loading(true)

    try {
      const res = await isaService.getIsas()

      if (res.error) {
        set_loading(false)
        set_request_error(res.error)
        return setTimeout(() => set_request_error(''), 3000)
      }
      set_loading(false)
      set_isas(res)
    } catch (e) {
      set_loading(false)
      set_request_error(e.error || e.toString())
      return setTimeout(() => set_request_error(''), 3000)
    }
  }

  useLayoutEffect(() => {
    getIsas()
  }, [])

  return (
    <article className="MyIsa-page">
      <PageHeader user={props.currentUser} />
      {loading ? (
        <Loader />
      ) : (
        <PageContent>
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
                    onClick={() => props.history.push('/isa/' + isa.id)}
                    key={index}
                    name={isa.student.first_name + ' ' + isa.student.last_name}
                    status={isa.status}
                  />
                ))}
              <Link to="isa/create" className="new_isa">
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
              <Link to="isa/create" className="new_isa">
                <Icon icon="new_isa_plus" />
                NEW ISA
              </Link>
            </section>
          )}
        </PageContent>
      )}
      <Message message={request_error} />
    </article>
  )
}
