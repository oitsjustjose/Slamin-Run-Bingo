import { createRoot } from 'react-dom/client';

import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

if (!window.localStorage.getItem('color')) {
  window.localStorage.setItem('color', 'green');
}

if (!window.localStorage.getItem('uom')) {
  window.localStorage.setItem('uom', 'inch');
}

root.render(App());
