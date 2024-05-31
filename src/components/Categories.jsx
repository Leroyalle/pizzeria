import React from 'react';
export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
export function Categories({ value, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              className={value === index ? 'active' : ''}
              key={index}
              onClick={() => onClickCategory(index)}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
