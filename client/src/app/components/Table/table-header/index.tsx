import React from 'react'
import styled from 'styled-components'
import { Header } from '../index'
import './style.scss'
import { notEmptyArray } from '../../../../helpers/base'

interface TableHeaderProps {
  headers?: Header[]
  onSort: (item: any) => void
  frs: string
  asc?: boolean
  style?: string
  sortBy?: string
}

const HeaderRow = styled<any>('div')`
  display: grid;
  grid-template-columns: ${props => props.frs};
  grid-column-gap: 15px;
`

export default function TableHeader(props: TableHeaderProps) {
  return (
    <HeaderRow className="TableHeader-component" frs={props.frs}>
      {notEmptyArray(props.headers) &&
        props.headers!.map((header: Header, i: number) => (
          <div
            className={`header-row ${header.className || ''}`}
            key={i}
            onClick={() => (header.sortable ? props.onSort(header.key) : null)}
          >
            {header.title}
            {header.sortable && (
              <img
                src="/web/assets/icons/polygon.svg"
                alt="arrow"
                className={props.asc && props.sortBy === header.key ? 'active' : ''}
              />
            )}
          </div>
        ))}
    </HeaderRow>
  )
}
