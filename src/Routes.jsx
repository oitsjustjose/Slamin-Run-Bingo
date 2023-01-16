import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from './views/Home';

export const Pages = [
  {
    name: 'Home',
    path: '/',
    element: (<Home />),
  },
];

export default () => (
  <BrowserRouter>
    <RouterRoutes>
      {
      Pages.map((page) => (
        <Route
          key={page.name}
          exact
          path={page.path}
          element={page.element}

        />
      ))
    }
    </RouterRoutes>
  </BrowserRouter>
);
