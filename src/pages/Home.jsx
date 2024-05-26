import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setActiveCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { endpoints } from '../api/endpoints';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { ItemBlock } from '../components/ItemBlock';
import { Placeholder } from '../components/ItemBlock/Placeholder';
import { Pagination } from '../components/Pagination';
import { sortList } from '../components/Sort';
export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const activeSort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.search.searchValue);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort: { name: sortParam.name, sortProperty: sortParam.sortProperty },
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.sortProperty,
        activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, activeSort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (!isSearch.current) {
      const category = activeCategory ? `category=${activeCategory}` : '';
      const sortBy = activeSort.sortProperty;
      const page = `_page=${currentPage}`;
      const perPage = `_per_page=4`;

      async function fetchData() {
        try {
          setIsLoading(true);
          const search = searchValue ? `title=${searchValue}` : '';
          const pizzasResponse = await axios.get(
            `${endpoints.pizzas}?${page}&${perPage}&${category}&_sort=${sortBy}&${search}`,
          );
          setItems(pizzasResponse.data.data);
          setIsLoading(false);
        } catch (error) {
          return error;
        }
      }
      fetchData();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={activeCategory}
          onClickCategory={(id) => dispatch(setActiveCategory(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, index) => <Placeholder key={index} />)
          : items.map((item) => <ItemBlock key={item.id} {...item} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}
