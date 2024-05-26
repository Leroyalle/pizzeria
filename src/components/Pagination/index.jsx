import React from 'react';
import ReactPaginate from 'react-paginate';
import Styles from './Pagination.module.scss';
export function Pagination({ currentPage, onChangePage }) {
  return (
    <ReactPaginate
      className={Styles.root}
      breakLabel="..."
      nextLabel=" >"
      previousLabel="< "
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}
