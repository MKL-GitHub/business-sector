import React from 'react';
import './index.scss';

function Loading({ loading, children }) {
  if (loading === 'success') return <>{children}</>

  return (
    <div className='Loading'>
      <span>Loading...</span>
      <span className='Loading-spinner' />
    </div>
  );
};

export default React.memo(Loading);