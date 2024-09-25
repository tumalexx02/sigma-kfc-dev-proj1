import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { IInputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.css'
import { Label } from '../Label/Label';

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input({className, inputId, customSize = 'default', backgroundColor = 'transparent', isValid = true, label,  ...props}, ref) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    console.log(value);
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const InputElement = (
    <input ref={ref} {...props} id={inputId} value={value} onChange={handleChange} style={{backgroundColor: backgroundColor}} className={cn(styles['input'], styles[customSize], className, {
      [styles['invalid']]: !isValid
    })} />
  )

  return (
    <>
      {label
        ? 
        (
          <div className={styles['input-wrapper']}>
            <Label htmlFor={inputId}>{label}</Label>
            {InputElement}
          </div>
        )
        : 
        InputElement
      }
    </>
  )
})

export default Input;