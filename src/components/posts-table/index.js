import React from 'react';
import './index.scss';

import downImg from '@assets/svgs/down.svg';

function PostsTable({ items, onSort, sortParams }) {

  const getSortStyle = (prop) => {
    return sortParams.prop === prop && !sortParams.isAscending && 'PostsTable_isNotAscending';
  }

  return (
    <table className='PostsTable'>
      <thead>
        <tr>
          <th
            className={`PostsTable-thId ${getSortStyle('id')}`}
            onClick={() => onSort('id')}>
            ID<img className='PostsTable-sortImg' src={downImg} alt='' />
          </th>
          <th
            className={`PostsTable-thTitle ${getSortStyle('title')}`}
            onClick={() => onSort('title')}>
            Заголовок<img className='PostsTable-sortImg' src={downImg} alt='' />
          </th>
          <th
            className={`PostsTable-thBody ${getSortStyle('body')}`}
            onClick={() => onSort('body')}>
            Описание<img className='PostsTable-sortImg' src={downImg} alt='' />
          </th>
        </tr>
      </thead>

      <tbody>
        {items.map(item =>
          <tr key={item.id}>
            <td className='PostsTable-tdId'>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default React.memo(PostsTable);