import { forwardRef } from 'react';
import { InputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.css'

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, isValid = true,  ...props}, ref) {
  return (
    <input ref={ref} {...props} className={cn(styles['input'], className, {
      [styles['invalid']]: !isValid
    })} />
  )
})

export default Input;