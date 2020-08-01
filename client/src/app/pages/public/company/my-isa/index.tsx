import React, { useState } from 'react'
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

const isaService = new IsaService()

const ISAs: any = [
  { id: 1, name: 'Jonah Serna', status: 'active' },
  { id: 2, name: 'Dina Castro', status: 'paying' },
  { id: 3, name: 'Glenn Stone', status: 'completed' },
]

interface MyIsa extends ScreenProps {}

export default function MyIsa(props: MyIsa) {
  const [filter, set_filter] = useState('')
  return (
    <article className="MyIsa-page">
      <PageHeader user={props.currentUser} />
      <PageContent>
        <header className="page-header">
          <h1 className="page-title">My ISA’s</h1>
          {notEmptyArray(ISAs) && (
            <Select
              value={filter}
              options={['View all', 'active', 'paying', 'completed']}
              onChange={e => set_filter(e)}
              placeholder={'View all'}
            />
          )}
        </header>
        {notEmptyArray(ISAs) ? (
          <section className="my_isa">
            {ISAs.filter((i: any) => i.status.includes(filter === 'View all' ? '' : filter)).map(
              (isa: any, index: number) => (
                <IsaStatus
                  onClick={(id: number) => props.history.push('/isa/' + id)}
                  id={isa.id}
                  key={index}
                  name={isa.name}
                  status={isa.status}
                />
              ),
            )}
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
    </article>
  )
}
