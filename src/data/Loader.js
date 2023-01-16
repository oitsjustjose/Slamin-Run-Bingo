import Weapons from './weapons.json';
import Splats from './splats.json';

export const Shuffle = (arr) => {
  const arrayIndices = new Set();
  const ret = [];
  while (arrayIndices.size < arr.length) {
    arrayIndices.add(Math.floor((Math.random() * 100) % arr.length));
  }
  arrayIndices.forEach((x) => ret.push(arr[x]));
  return ret;
};

export const PickSplat = () => Splats[Math.floor(Math.random() * Splats.length)];

export const LoadDataOrFallback = () => {
  const stored = window.localStorage.getItem('splatoon_card');
  return stored ? JSON.parse(stored) : Shuffle(Weapons).map((x) => ({
    src: x,
    hit: false,
  }));
};

export const SaveDataToAppStorage = (bingoCard) => {
  window.localStorage.setItem('splatoon_card', JSON.stringify(bingoCard));
};

export const ClearSavedData = () => {
  window.localStorage.removeItem('splatoon_card');
  window.location.reload();
};
