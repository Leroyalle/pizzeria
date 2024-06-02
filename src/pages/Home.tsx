import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectFilter,
  selectSort,
  setActiveCategory,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { Sort, TypeSort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { categories } from '../components/Categories';
import { ItemBlock } from '../components/ItemBlock';
import { Placeholder } from '../components/ItemBlock/Placeholder';
import { Pagination } from '../components/Pagination';
import { sortList } from '../components/Sort';
import { fetchPizzas, selectPizzas, TypeSearchPizzasParams } from '../redux/slices/pizzasSlice';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const activeSort = useSelector(selectSort);
  const { searchValue, activeCategory, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const onClickCategory = (id: number) => {
    dispatch(setActiveCategory(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1),
  //     ) as unknown as TypeSearchPizzasParams;
  //     const sortParam = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         activeCategory: Number(params.category),
  //         currentPage: Number(params.page),
  //         sort: sortParam || sortList[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: activeSort.sortProperty,
  //       activeCategory,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [activeCategory, activeSort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (!isSearch.current) {
      const category = activeCategory ? `category=${activeCategory}` : '';
      const sortBy = activeSort.sortProperty;
      const page = `_page=${currentPage}`;
      const perPage = `_per_page=4`;
      const search = searchValue ? `title=${searchValue}` : '';
      // @ts-ignore
      async function fetchData() {
        dispatch(
          fetchPizzas({
            category,
            sortBy,
            page,
            perPage,
            search,
          }),
        );
      }
      fetchData();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={activeCategory} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">
        {activeCategory === 0 ? 'Все пиццы' : categories[activeCategory]}
      </h2>
      <div className="content__items">
        {status === 'error' ? (
          <ErrorDisplay type={'error'} />
        ) : status === 'loading' ? (
          [...Array(6)].map((_, index) => <Placeholder key={index} />)
        ) : (
          items.map((item: any) => <ItemBlock key={item.id} {...item} />)
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
