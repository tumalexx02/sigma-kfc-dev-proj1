import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthLayout from './layouts/Auth/AuthLayout.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { ThemeProvider } from './helpers/ThemeProvider.ts';
import MainLayout from './layouts/Main/MainLayout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><MainLayout /></RequireAuth>
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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
