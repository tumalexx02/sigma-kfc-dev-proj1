import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface IUserStore {
  jwt: string | null;
}

export const useUserStore = create<IUserStore>()(devtools(
  persist(
    (set) => ({
      jwt: null,
      login: (newJwt: string | null) => set({jwt: newJwt})
    }),
    {
      name: 'userData',
      partialize: (state: IUserStore) => ({ jwt: state.jwt })
    }
  )
))