import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSizes = 'small' | 'medium' | 'big';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizes;
  children: ReactNode;
  accent?: boolean;
}