import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/user.store';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const jwt = useUserStore(state => state.jwt);

  if (!jwt) {
    return <Navigate to='/auth/login' replace />
  }

  return children;
}