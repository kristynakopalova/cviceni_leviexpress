import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { App } from './components/App';
import './global.css';
import { HomePage } from './pages/HomePage';
import { Home } from './components/Home';
import { JourneyPicker } from './components/JourneyPicker';
import { Reservation } from './components/Reservation';
import { ReservationPage } from './components/ReservationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'homepage',
        element: <HomePage />,
      },
      {
        path: '/',
        element: <JourneyPicker />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },

  {
    path: '/reservation',
    element: <Reservation />,
    children: [
      {
        path: '/reservation',
        element: <ReservationPage />,
      },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
