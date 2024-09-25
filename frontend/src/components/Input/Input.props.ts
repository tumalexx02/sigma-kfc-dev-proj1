import { InputHTMLAttributes } from 'react';

type InputSizes = 'default' | 'big';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  customSize?: InputSizes;
  backgroundColor?: string;
  label?: string;
  inputId?: string;
}