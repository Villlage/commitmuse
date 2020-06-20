import React from 'react'
import styled from 'styled-components'
import TableHeaders from './table-header/index'
import './style.scss'

export interface Header {
  key: string
  title: string
  className?: string
  fr?: number
  sortable?: boolean
  customColor?: string
}

interface TableProps {
  headers: Header[]
  rows: any[]
  style?: string
  background?: string
  rowHoverColor?: string
  onRowCLick?: (row: any) => void
}

const Row = styled<any>('div')`
  background: ${props => props.background || '#fff'};
  display: grid;
  grid-template-columns: ${props => props.frs};
  grid-column-gap: 15px;
  :hover {
    background-color: ${props => props.hoverColor || 'transparent'};
  }
`

const Column = styled<any>('div')`
  color: ${props => props.color || 'inherit'};
  justify-content: ${props => props.align};
  cursor: ${props => (props.pointer ? 'pointer' : '')};
`

export default function Table(props: TableProps) {
  const [rows, setRows] = React.useState(props.rows)
  const [sortBy, setSortBy] = React.useState('')
  const [asc, setSortType] = React.useState(false)

  const onSort = (item: any) => {
    const sortedRows =
      rows &&
      rows.sort((a: any, b: any) => {
        if (a[item] < b[item]) {
          return -1
        }
        if (a[item] > b[item]) {
          return 1
        }
        return 0
      })
    setSortBy(item)
    setRows(sortedRows)
    setSortType(!asc)

    if (asc) {
      const reversed = rows && rows.reverse()
      setRows(reversed)
      setSortType(!asc)
    }
  }

  const frs = props.headers.reduce(
    (acc, header) => (header.fr ? (acc += header.fr.toString() + 'fr ') : (acc += '1fr ')),
    '',
  )

  return (
    <div className="Table-component">
      <TableHeaders
        headers={props.headers}
        onSort={(item: any) => onSort(item)}
        asc={asc}
        sortBy={sortBy}
        style={props.style}
        frs={frs}
      />
      {rows &&
        rows.map((row: any, i: number) => (
          <Row key={i} frs={frs} className="table-row" background={props.background} hoverColor={props.rowHoverColor}>
            {props.headers &&
              props.headers.map((header: Header, i: number) => (
                <Column
                  className={`table-column ${header.className || ''}`}
                  color={header.customColor}
                  align={'left'}
                  pointer={!!props.onRowCLick}
                  onClick={() => (props.onRowCLick ? props.onRowCLick(row) : null)}
                  key={i}
                >
                  {row[header.key]}
                </Column>
              ))}
          </Row>
        ))}
    </div>
  )
}
