import React from 'react'
import './style.scss'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

export default function Paginator(props: ReactPaginateProps) {
  return (
    <section className="Paginator-component">
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={props.pageCount}
        marginPagesDisplayed={props.marginPagesDisplayed}
        pageRangeDisplayed={props.pageRangeDisplayed}
        onPageChange={props.onPageChange}
        containerClassName={props.containerClassName}
        activeClassName={'active'}
      />
    </section>
  )
}
