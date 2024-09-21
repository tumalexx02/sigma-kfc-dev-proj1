import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSizes = 'small' | 'medium' | 'big';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizes;
  children: ReactNode;
  accent?: boolean;
}