import React from 'react'
import './style.scss'
import { ScreenProps } from '../../../../interfaces/baseIntefaces'
import PageHeader from '../../../modules/common/PageHeader'
import Icon from '../../../components/Icon'

interface MyIsa extends ScreenProps {}

const ISAs = [
  { name: 'Jonah Serna', status: 'active' },
  { name: 'Dina Castro', status: 'paying' },
  { name: 'Glenn Stone', status: 'completed' },
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
  console.log('props.currentUser', props.currentUser)
  return (
    <article className="MyIsa-page">
      <PageHeader user={props.currentUser} />
      <section className="content">
        <section className="my_isa">
          <header>
            <h1>My ISA's</h1>
            <div className="actions">
              <button className="new_isa">
                <Icon icon="new_isa_plus" />
                NEW ISA
              </button>
              <button className="filter_btn">
                View All <Icon icon="select_down" />
              </button>
            </div>
          </header>
          <footer>
            {ISAs.map((isa, index) => (
              <Isa key={index} name={isa.name} status={isa.status} />
            ))}
          </footer>
        </section>
      </section>
    </article>
  )
}

type IsaProps = {
  status: string
  name: string
}

function Isa(props: IsaProps) {
  return (
    <div className="single_isa">
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