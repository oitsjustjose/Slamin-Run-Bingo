/* eslint-disable no-plusplus */
import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import BingoSlot from '../components/BingoSlot';
import { LoadDataOrFallback, SaveDataToAppStorage, ClearSavedData } from '../data/Loader';
import Freespace from '../data/weapons/freespaec.png';

export default () => {
  const data = LoadDataOrFallback();
  SaveDataToAppStorage(data);

  const boardDims = {
    width: 7, height: 7,
  };

  const bingoSlots = data.map((x, idx) => (
    <BingoSlot
      src={x.src}
      hitIn={x.hit}
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      propagateChanges={(newState) => {
        data[idx].hit = newState;
        SaveDataToAppStorage(data);
      }}
    />
  ));

  let idx = 0;
  const rows = [];

  for (let row = 1; row <= boardDims.height; row++) {
    const cols = [];
    for (let col = 1; col <= boardDims.width; col++) {
      if (!(row === Math.round(boardDims.height / 2)
       && col === Math.round(boardDims.width / 2))) {
        cols.push(bingoSlots[idx]);
        idx++;
      } else {
        // Special case for the freespace, which lives at the end of the data array
        cols.push(
          <BingoSlot
            src={Freespace}
            hitIn={data[data.length - 1].hit}
            key="freespaec"
            propagateChanges={(newState) => {
              data[data.length - 1].hit = newState;
              SaveDataToAppStorage(data);
            }}
          />,
        );
        // cols.push(<Blank />);
      }
    }

    const tblRow = (
      <div
        key={row}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        {cols}
      </div>
    );
    rows.push(tblRow);
  }

  return (
    <div>
      <div style={{ display: '2rem auto', textAlign: 'center' }}>
        <img
          src="/img/title.png"
          alt="title"
          style={{
            userSelect: 'none',
            // display: 'block',
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
