import styles from "./Button.module.css";
import cn from "classnames";
import { IButtonProps } from './Button.props';

export function Button({ children, size = 'medium', accent = false, className, shape = 'default', outlined = false, ...props }: IButtonProps) {
  return (
    <button {...props} className={cn(className, styles["button"], styles[size], styles[shape], {
      [styles['accent']]: accent,
      [styles['outlined']]: outlined
    })}>
      {children}
    </button>
  );
}
