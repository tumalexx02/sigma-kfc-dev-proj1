import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface IUserStore {
  jwt: string | null;
  serverError: string | null;
  login: () => void;
  register: () => void;
  clearServerError: () => void;
}

export const useUserStore = create<IUserStore>()(devtools(
  persist(
    (set) => ({
      jwt: null,
      serverError: null,
      login: async () => {
        Promise.reject('Неверный email или пароль').catch((e) => set({serverError: e}));
      },
      register: async () => {
        Promise.reject('Пользователь с таким email уже существует').catch((e) => set({serverError: e}));
      },
      clearServerError: () => set({serverError: null})
    }),
    {
      name: 'userData',
      partialize: (state: IUserStore) => ({ jwt: state.jwt })
    }
  )
))