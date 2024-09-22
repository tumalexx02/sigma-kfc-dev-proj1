import { forwardRef } from 'react';
import { IInputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.css'

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input({className, isValid = true,  ...props}, ref) {
  return (
    <input ref={ref} {...props} className={cn(styles['input'], className, {
      [styles['invalid']]: !isValid
    })} />
  )
})

export default Input;