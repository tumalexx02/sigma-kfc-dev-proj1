import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { IInputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.css'

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input({className, isValid = true,  ...props}, ref) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    console.log(value);
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <input ref={ref} {...props} value={value} onChange={handleChange} className={cn(styles['input'], className, {
      [styles['invalid']]: !isValid
    })} />
  )
})

export default Input;