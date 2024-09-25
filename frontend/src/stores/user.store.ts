import axios, { AxiosError } from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IAuthResponse } from '../interfaces/Auth.interface';

type serverErrorTypeType = 'all' | 'email' | null;

export interface IUserStore {
  jwt: string | null;
  serverErrorMessage: string | null;
  serverErrorType: serverErrorTypeType;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearServerError: () => void;
}

export const useUserStore = create<IUserStore>()(devtools(
  persist(
    (set) => ({
      jwt: null,
      serverErrorMessage: null,
      serverErrorType: null,
      login: async (email: string, password: string) => {
        try {
          set({serverErrorMessage: null, serverErrorType: null});
          const { data } = await axios.post<IAuthResponse>('http://localhost:8000/api/sign-in', {
            email,
            password
          })
  
          set({ jwt: data['token'] });
        } catch(e) {
          if (e instanceof AxiosError) {
            if (e.request.response) {
              const error = JSON.parse(e.request.response);
              set({serverErrorMessage: error.message, serverErrorType: error.tag.toLowerCase()});
            } else {
              set({serverErrorMessage: 'Ошибка сервера', serverErrorType: null});
            }
          }
        }
      },
      register: async (name: string, email: string, password: string) => {
        try {
          set({serverErrorMessage: null, serverErrorType: null});

          const { data } = await axios.post<IAuthResponse>('http://localhost:8000/api/sign-up', {
            name,
            email,
            password
          })
  
          set({ jwt: data['token'] });
        } catch(e) {
          if (e instanceof AxiosError) {
            if (e.request.response) {
              const error = JSON.parse(e.request.response);
              set({serverErrorMessage: error.message, serverErrorType: error.tag.toLowerCase()});
            } else {
              set({serverErrorMessage: 'Ошибка сервера', serverErrorType: null});
            }
          }
        }
      },
      logout: () => {
        set({jwt: null})
      },
      clearServerError: () => set({serverErrorMessage: null, serverErrorType: null})
    }),
    {
      name: 'userData',
      partialize: (state: IUserStore) => ({ jwt: state.jwt })
    }
  )
))