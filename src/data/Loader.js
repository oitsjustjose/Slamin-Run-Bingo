/* eslint-disable no-plusplus */
import GetWeapons from './weapons/Weapons';
import { GridSize } from '../App';
import Freespace from './weapons/freespaec.png';

export const Shuffle = (arr) => {
  const arrayIndices = new Set();
  const ret = [];
  while (arrayIndices.size < arr.length) {
    arrayIndices.add(Math.floor((Math.random() * 100) % arr.length));
  }
  arrayIndices.forEach((x) => ret.push(arr[x]));
  return ret;
};

export const LoadDataOrFallback = () => {
  const stored = window.localStorage.getItem('splingo_state');
  if (stored) {
    // Need to convert obj to 2d arr
    const as2d = [];
    Object.values(JSON.parse(stored)).forEach((x) => as2d.push(x));
    return as2d;
  }

  const as2dArray = [];
  const weaponArray = Shuffle(GetWeapons()).slice(0, GridSize * GridSize);
  const midSize = Math.floor(GridSize / 2);

  let idx = 0;
  for (let row = 0; row < GridSize; row++) {
    const column = [];
    for (let col = 0; col < GridSize; col++) {
      column.push({
        src: (row === midSize && col === midSize)
          ? Freespace : weaponArray[idx],
        hit: false,
      });
      idx++;
    }
    as2dArray[row] = column;
  }

  return as2dArray;
};

export const SaveDataToAppStorage = (data) => {
  const asObj = {};
  data.forEach((row, idx) => {
    asObj[idx] = row;
  });
  window.localStorage.setItem('splingo_state', JSON.stringify(asObj));
};

export const ClearSavedData = () => {
  window.localStorage.removeItem('splingo_state');
  window.location.reload();
};
