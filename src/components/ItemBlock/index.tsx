import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TypeCartItem } from '../../redux/slices/cart/types';
import { selectCartItemById } from '../../redux/slices/cart/selectors';
import { addItem } from '../../redux/slices/cart/slice';
import { Link } from 'react-router-dom';
const typeNames = ['тонкое', 'традиционное'];
const sizeNames = [26, 30, 40];

type TypeItemBlock = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export const ItemBlock: React.FC<TypeItemBlock> = ({
  id,
  imageUrl,
  title,
  price,
  types,
  sizes,
}) => {
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);

  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item: TypeCartItem = {
      id,
      imageUrl,
      title,
      price,
      type: typeNames[activeType],
      size: sizeNames[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <Link to={`pizza/${id}`} className="pizza-block__header">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => {
              return (
                <li
                  onClick={() => setActiveType(i)}
                  className={activeType === i ? 'active' : ''}
                  key={i}>
                  {typeNames[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, i) => {
              return (
                <li
                  onClick={() => setActiveSize(i)}
                  key={i}
                  className={activeSize === i ? 'active' : ''}>
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className="button button--outline button--add" onClick={() => onClickAdd()}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>{' '}
    </div>
  );
};
