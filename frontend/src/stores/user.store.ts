import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IAuthResponse } from '../interfaces/Auth.interface';

export interface IUserStore {
  jwt: string | null;
  serverError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearServerError: () => void;
}

export const useUserStore = create<IUserStore>()(devtools(
  persist(
    (set) => ({
      jwt: null,
      serverError: null,
      login: async (email: string, password: string) => {
        try {
          const { data } = await axios.post<IAuthResponse>('http://localhost:8000/api/sign-in', {
            email,
            password
          })
  
          set({ jwt: data['token'] });
        } catch(e) {
          console.log(e)
        }
      },
      register: async (name: string, email: string, password: string) => {
        try {
          const { data } = await axios.post<IAuthResponse>('http://localhost:8000/api/sign-up', {
            name,
            email,
            password
          })
  
          set({ jwt: data['token'] });
        } catch(e) {
          console.log(e)
        }
      },
      logout: () => {
        set({jwt: null})
      },
      clearServerError: () => set({serverError: null})
    }),
    {
      name: 'userData',
      partialize: (state: IUserStore) => ({ jwt: state.jwt })
    }
  )
))