import React from 'react';
import styles from './ErrorDisplay.module.scss';
export const ErrorDisplay: React.FC<{ type: string }> = ({ type }) => {
  const clickReload = () => {
    window.location.reload();
  };
  return (
    <div className={styles['error']}>
      <h2 className={styles['error__title']}>Произошла ошибка 🤡</h2>
      <p className={styles['error__text']}>
        {type === 'notFound'
          ? 'Такой страницы не существует.'
          : 'Прозошла ошибка при получении данных.'}
      </p>

      <p className={styles['error__text']}>Скорее всего адрес страницы был изменен или удален</p>
      <button
        onClick={clickReload}
        className={`button 'button--black' ${styles['error__reload']} `}>
        Попробовать еще
      </button>
    </div>
  );
};
