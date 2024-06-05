import React from 'react';

export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type TypeCategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

export const Categories: React.FC<TypeCategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, i) => {
            return (
              <li
                className={value === i ? 'active' : ''}
                key={i}
                onClick={() => onClickCategory(i)}>
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
