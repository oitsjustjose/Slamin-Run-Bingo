import Blue from './sprites/Blue.png';
import Cyan from './sprites/Cyan.png';
import Orange from './sprites/Orange.png';
import Pink from './sprites/Pink.png';
import Teal from './sprites/Teal.png';
import Yellow from './sprites/Yellow.png';

export const Splats = [
  Blue,
  Cyan,
  Orange,
  Pink,
  Teal,
  Yellow,
];

export default () => Splats[Math.floor(Math.random() * Splats.length)];
