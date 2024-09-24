import { ReactElement } from 'react';
import { Button } from '../Button/Button';
import { IButtonProps } from '../Button/Button.props';
import styles from './IconButton.module.css'
import cn from 'classnames'

export const IconButton = ({children, outlined, size = 'medium', className, ...props}: IButtonProps & { children: ReactElement<SVGElement> }) => {
  return (
    <Button size={size} outlined={outlined} className={cn(className, styles['icon-button'], styles[size], {
      [styles['outlined']]: outlined
    })} {...props}>
      {children}
    </Button>
  )
}