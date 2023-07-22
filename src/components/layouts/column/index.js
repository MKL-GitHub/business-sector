import React from 'react';
import './index.scss';

function Column({ gap, children }) {
  return (
    <div className='Column' style={{ gap }}>
      {children}
    </div>
  )
}

export default React.memo(Column);