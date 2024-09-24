import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSizes = 'small' | 'medium' | 'big';
type ButtonShape = 'round' | 'default' | 'square';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizes;
  accent?: boolean;
  shape?: ButtonShape;
  children: ReactNode;
  outlined?: boolean;
}