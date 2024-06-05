import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filter/slice';
import { EnumSortProperty } from '../redux/slices/filter/types';
import { selectSort } from '../redux/slices/filter/selectors';

export type TypeSort = {
  name: string;
  sortProperty: EnumSortProperty;
};

export const sortList: TypeSort[] = [
  { name: 'популярности ↓', sortProperty: EnumSortProperty.RATING_DESC },
  { name: 'популярности ↑', sortProperty: EnumSortProperty.RATING_ASC },
  { name: 'цене ↓', sortProperty: EnumSortProperty.PRICE_DESC },
  { name: 'цене ↑', sortProperty: EnumSortProperty.PRICE_ASC },
  { name: 'алфавиту ↓', sortProperty: EnumSortProperty.TITLE_DESC },
  { name: 'алфавиту ↑', sortProperty: EnumSortProperty.TITLE_ASC },
];
type TypeSortPopupProps = {
  value: TypeSort;
};

export const Sort: React.FC<TypeSortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);
  const [popupIsOpened, setPopupIsOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleClickOutOfSort = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setPopupIsOpened(false);
      }
    };

    document.body.addEventListener('click', handleClickOutOfSort);
    return () => document.body.removeEventListener('click', handleClickOutOfSort);
  }, []);

  const onClickSortFunc = (obj: TypeSort) => {
    dispatch(setSort(obj));
    setPopupIsOpened(false);
  };
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по: </b>
        <span onClick={() => setPopupIsOpened(!popupIsOpened)}>{value.name}</span>
      </div>
      {popupIsOpened && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, i) => (
              <li
                onClick={() => onClickSortFunc(item)}
                key={i}
                className={value.sortProperty === item.sortProperty ? 'active' : ''}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
