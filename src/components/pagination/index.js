import React from 'react';
import './index.scss';

function Pagination({ page, quantity, onMove }) {
  const pages = [];

  for (let i = 1; i <= quantity; i++) {
    pages.push(
      <button
        key={i}
        className={`Pagination-pageButton ${page === i && 'Pagination-pageButton_current'}`}
        onClick={() => onMove(i)}>
        {i}
      </button>
    )
  }

  const onMoveNext = () => {
    const nextPage = page + 1;
    nextPage <= quantity && onMove(nextPage);
  }

  const onMoveBack = () => {
    const backPage = page - 1;
    backPage && onMove(backPage);
  }

  return (
    <div className='Pagination'>
      <button
        className='Pagination-sideButtons'
        onClick={onMoveBack}>
        Назад
      </button>

      <div className='Pagination-pageButtons'>{pages}</div>

      <button
        className='Pagination-sideButtons'
        onClick={onMoveNext}>
        Далее
      </button>
    </div>
  );
};

export default React.memo(Pagination);