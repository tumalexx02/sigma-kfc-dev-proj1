import styles from "./Button.module.css";
import cn from "classnames";
import { IButtonProps } from './Button.props';

export function Button({ children, size, accent = false, ...props }: IButtonProps) {
  return (
    <button {...props} className={cn(styles["button"], styles[size], {
      [styles['accent']]: accent
    })}>
      {children}
    </button>
  );
}
