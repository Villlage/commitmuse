import React, { useState } from 'react'
import './style.scss'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageHeader from '../../../../modules/common/PageHeader'
import Icon from '../../../../components/Icon'
import Select from '../../../../components/Select/Select'
import { fixClass, notEmptyArray } from '../../../../../helpers/base'
import IsaService from '../../../../../services/isa.service'
import PageContent from '../../../../modules/common/PageContent'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const isaService = new IsaService()

const ISAs: any = [
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

interface MyIsa extends ScreenProps {}

export default function MyIsa(props: MyIsa) {
  const [filter, set_filter] = useState('')
  return (
    <article className="MyIsa-page">
      <PageHeader user={props.currentUser} fetchUser={props.fetchUser} />
      <PageContent>
        <h1 className="page-title">My ISA’s</h1>
        {notEmptyArray(ISAs) ? (
          <section className="my_isa">
            {/*<Select*/}
            {/*  value={filter}*/}
            {/*  options={['View all', 'active', 'paying', 'completed']}*/}
            {/*  onChange={e => set_filter(e)}*/}
            {/*  placeholder={'View all'}*/}
            {/*/>*/}
            {ISAs.filter((i: any) => i.status.includes(filter === 'View all' ? '' : filter)).map(
              (isa: any, index: number) => (
                <Isa
                  onClick={id => props.history.push('/isa/' + id)}
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

type IsaProps = {
  id: number
  status: string
  name: string
  onClick(id: number): void
}

function Isa(props: IsaProps) {
  return (
    <div className="single_isa" onClick={() => props.onClick(props.id)}>
      <div>
        <h2>{props.name}</h2>
        {props.status === 'paying' && <p className={props.status}>PAYING - 5K of 20K</p>}
        {props.status === 'completed' && <p className={props.status}>COMPLETED - 20K</p>}
      </div>
      <CircularProgressbar background={status_colors[props.status].bg} value={25} text={`${25}%`} />
      <div
        className={props.status + fixClass(props.status !== 'active' && 'round')}
        style={{
          color: status_colors[props.status].text,
          background: status_colors[props.status].bg,
          borderColor: status_colors[props.status].text,
        }}
      >
        {props.status === 'paying' && <p className={props.status}>25%</p>}
        {props.status === 'completed' && <p className={props.status}>100%</p>}
        {props.status === 'active' && props.status}
      </div>
    </div>
  )
}
