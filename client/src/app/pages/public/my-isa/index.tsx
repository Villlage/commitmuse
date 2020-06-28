import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../interfaces/baseIntefaces'
import PageHeader from '../../../modules/common/PageHeader'
import Icon from '../../../components/Icon'
import Select from '../../../components/Select/Select'

interface MyIsa extends ScreenProps {}

const ISAs = [
  { id: 1, name: 'Jonah Serna', status: 'active' },
  { id: 2, name: 'Dina Castro', status: 'paying' },
  { id: 3, name: 'Glenn Stone', status: 'completed' },
]

const status_colors: any = {
  active: {
    bg: '#C6F7E2',
    text: '#147D64',
  },
  paying: {
    bg: '#FFF3C4',
    text: '#CB6E17',
  },
  completed: {
    bg: '#BAE3FF',
    text: '#0967D2',
  },
}

export default function MyIsa(props: MyIsa) {
  const [filter, set_filter] = useState('')
  return (
    <article className="MyIsa-page">
      <PageHeader user={props.currentUser} />
      <section className="content">
        <section className="my_isa">
          <header>
            <h1>My ISA's</h1>
            <Select
              value={filter}
              options={['View all', 'active', 'paying', 'completed']}
              onChange={e => set_filter(e)}
              placeholder={'View all'}
            />
          </header>
          <footer>
            {ISAs.filter(i => i.status.includes(filter === 'View all' ? '' : filter)).map((isa, index) => (
              <Isa
                onClick={id => props.history.push('/isa/' + id)}
                id={isa.id}
                key={index}
                name={isa.name}
                status={isa.status}
              />
            ))}
            <button className="new_isa">
              <Icon icon="new_isa_plus" />
              NEW ISA
            </button>
          </footer>
        </section>
      </section>
    </article>
  )
}

type IsaProps = {
  id: number
  status: string
  name: string
  onClick(id: number): void
}

function Isa(props: IsaProps) {
  return (
    <div className="single_isa" onClick={() => props.onClick(props.id)}>
      <h2>{props.name}</h2>
      <div
        style={{
          color: status_colors[props.status].text,
          background: status_colors[props.status].bg,
        }}
      >
        {props.status}
      </div>
    </div>
  )
}
