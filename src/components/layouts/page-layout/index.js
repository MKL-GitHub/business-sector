import React from 'react';
import './index.scss';

function PageLayout({ children }) {
  return (
    <div className='Layout'>{children}</div>
  )
}

export default React.memo(PageLayout);