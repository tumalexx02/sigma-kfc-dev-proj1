import { LabelHTMLAttributes } from "react"
import styles from './Label.module.css'

export const Label = ({children, ...props}: LabelHTMLAttributes<HTMLLabelElement>) => {

  return (
    <label className={styles['label']} {...props}>
      {children}
    </label>
  )
}