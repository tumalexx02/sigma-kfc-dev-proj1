import { ReactNode, useEffect } from 'react';
import { useThemeStore } from '../stores/theme.store';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    const body = document.querySelector('body');
    
    if (body) {
      body.classList.remove(theme === 'dark' ? 'light' : 'dark');
      body.classList.add(theme);
    }
  }, [theme])

  return children;
}