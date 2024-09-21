import styles from "./Button.module.css";
import cn from "classnames";
import { ButtonProps } from './Button.props';

export function Button({ children, size, accent = false, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(styles["button"], styles[size], {
      [styles['accent']]: accent
    })}>
      {children}
    </button>
  );
}
