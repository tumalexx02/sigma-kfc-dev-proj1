import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthLayout from './layouts/Auth/AuthLayout.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth>123</RequireAuth>
  },
  {
    path: '/auth',
    element: <AuthLayout />, 
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <>Error</>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
