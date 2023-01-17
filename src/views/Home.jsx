/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { Button, Popup } from 'semantic-ui-react';
import { GridSize } from '../App';
import BingoSlot from '../components/BingoSlot';
import { LoadDataOrFallback, SaveDataToAppStorage, ClearSavedData } from '../data/Loader';

const CheckForBingpot = (data /* {src: img, hit: bool}[] */) => {
  let bingpot = true;
  let rowIdx = 0;
  let colIdx = 0;

  for (rowIdx = 0; rowIdx < GridSize; rowIdx++) {
    bingpot = true;
    for (colIdx = 0; colIdx < GridSize; colIdx++) {
      if (!data[rowIdx][colIdx].hit) {
        bingpot = false;
        break;
      }
    }
    if (bingpot) return true;
  }

  for (colIdx = 0; colIdx < GridSize; colIdx++) {
    bingpot = true;
    for (rowIdx = 0; rowIdx < GridSize; rowIdx++) {
      if (!data[rowIdx][colIdx].hit) {
        bingpot = false;
        break;
      }
    }
    if (bingpot) return true;
  }

  bingpot = true;
  rowIdx = 0;
  colIdx = 0;
  while (rowIdx < GridSize && colIdx < GridSize) {
    if (!data[rowIdx][colIdx].hit) {
      bingpot = false;
      break;
    }
    rowIdx++;
    colIdx++;
  }

  if (bingpot) return true;

  bingpot = true;
  rowIdx = 0;
  colIdx = (GridSize - 1);
  while (rowIdx < GridSize) {
    if (!data[rowIdx][colIdx].hit) {
      bingpot = false;
      break;
    }
    rowIdx++;
    colIdx--;
  }

  return bingpot;
};

export default () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const data = LoadDataOrFallback();
  SaveDataToAppStorage(data);

  const rows = [];
  data.forEach((row, rowIdx) => {
    rows.push(
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {row.map((x, colIdx) => (
          <BingoSlot
            src={x.src}
            hitIn={x.hit}
            // eslint-disable-next-line react/no-array-index-key
            key={colIdx}
            propagateChanges={(newState) => {
              data[rowIdx][colIdx].hit = newState;
              SaveDataToAppStorage(data);
              if (CheckForBingpot(data)) {
                setShowConfetti(true);
                // setTimeout(() => setShowConfetti(false), 3000);
              }
            }}
          />
        ))}
      </div>,
    );
  });

  return (
    <div>
      <Confetti
        run={showConfetti}
        recycle={false}
        colors={['#ffd300', '#88e4e1', '#ff2c5f', '#fe8102', '#47e4af', '#008ec0']}
      />

      <div style={{ display: '2rem auto', textAlign: 'center' }}>
        <img
          src="/img/title.png"
          alt="title"
          style={{
            userSelect: 'none',
            textAlign: 'center',
            maxWidth: '768px',
            width: '50vw',
            filter: 'invert(1)',
          }}
        />
      </div>

      <div style={{
        maxWidth: '768px',
        margin: 'auto',
        border: '2px solid #7a724b',
      }}
      >
        <div style={{
          backgroundColor: '#dfd39690',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          {rows}
        </div>
      </div>

      <Popup
        flowing
        hoverable
        position="top left"
        trigger={(
          <Button
            color="red"
            circular
            size="huge"
            icon="repeat"
            onClick={() => {
              // eslint-disable-next-line no-alert
              if (window.confirm('Reset Your Board and Re-Randomize Layout?')) {
                ClearSavedData();
              }
            }}
            style={{ position: 'fixed', bottom: '16px', left: '16px' }}
          />
        )}
      >
        Clear Board
      </Popup>

      <Popup
        flowing
        hoverable
        position="top right"
        trigger={(
          <Button
            style={{
              position: 'fixed', bottom: '16px', right: '16px', zIndex: '999999', backgroundColor: '#ecfe6c',
            }}
            size="huge"
            icon="info"
            circular
          />
        )}
      >
        Weapon Icons from
        {' '}
        <a href="https://splatoonwiki.org/wiki/List_of_weapons_in_Splatoon_3" target="_blank" rel="noreferrer">The Wiki</a>
        . All other art by my wife
        {' '}
        <a href="https://linktr.ee/ambroxer" target="_blank" rel="noreferrer">Ambroxer</a>
        .
      </Popup>
    </div>
  );
};
