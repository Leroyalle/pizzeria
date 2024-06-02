import React from 'react';
import ReactPaginate from 'react-paginate';
import Styles from './Pagination.module.scss';

type TypePagination = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<TypePagination> = ({ currentPage, onChangePage }) => {
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
};
