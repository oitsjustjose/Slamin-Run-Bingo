/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { PickSplat } from '../data/Loader';

export default ({ src, hitIn, propagateChanges }) => {
  const [hit, setHit] = useState(hitIn);

  const onClick = () => {
    const newState = !hit;
    propagateChanges(newState);
    setHit(newState);
  };

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        border: '2px solid #7a724b',
        userSelect: 'none',
      }}
    >
      {hit && (
        <img
          src={`/img/splats/${PickSplat()}`}
          alt="splatted"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10000,
            maxWidth: '100%',
            opacity: '85%',
          }}
        />
      )}
      <img
        className={src === 'freespaec.png' ? '' : 'bingoslot'}
        src={`/img/weapons/${src}`}
        alt="splatoon gun"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};
