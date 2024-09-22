import { ReactNode } from 'react';
import styles from './Headling.module.css'

export const Headling = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className={styles['headling']}>{children}</h1>
  )
}