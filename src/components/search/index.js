import React from 'react';
import './index.scss';

import searchImg from '@assets/svgs/search.svg';

function Search({ value, onChange }) {
  return (
    <div className='Search'>
      <input type='text' placeholder='Поиск' value={value} onChange={onChange} />
      <img src={searchImg} alt='' />
    </div>
  );
};

export default React.memo(Search);