import React from 'react';

const Display = ({x,y,z}) => {
    
  return <div className='output'>
      <div className='up'>{x}{z}</div>
      <div className='down'>{y}</div>
      </div>;
};

export default Display;
