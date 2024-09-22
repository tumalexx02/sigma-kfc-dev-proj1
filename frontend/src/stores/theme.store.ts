import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

export interface IThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<IThemeStore>()(persist(
  (set) => ({
    theme: 'dark',
    toggleTheme: () => set((state: IThemeStore) => ({theme: state.theme === 'dark' ? 'light' : 'dark'})),
    setTheme: (theme: Theme) => set({ theme })
  }),
  {
    name: 'theme',
    partialize: (state: IThemeStore) => ({ theme: state.theme })
  }
))