import { forwardRef, useState } from 'react';
import Input from '../Input/Input';
import { IInputProps } from '../Input/Input.props';
import styles from './ProtectedInput.module.css';
import cn from 'classnames'
import { HideIcon } from '../../icons/Hide.icon';
import { ShowIcon } from '../../icons/Show.icon';

const ProtectedInput = forwardRef<HTMLInputElement, IInputProps>(({className, ...props}, ref) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);

  const handleClickShowPassword = () => setIsPrivate((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles['protected-input']}>
      <Input ref={ref} type={isPrivate ? 'password' : 'text'} {...props} className={cn(className, styles['input'], {
        [styles['dotted-input']]: isPrivate
      })} />
      <button type="button" className={styles['toggle-button']} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword}>
        {
          isPrivate
            ? <HideIcon fill="var(--placeholder-color)" />
            : <ShowIcon fill="var(--placeholder-color)" />
        }
      </button>
    </div>
  )
})

export default ProtectedInput;