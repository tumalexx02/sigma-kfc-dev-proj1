import { ErrorIcon } from '../../icons/Error.icon'
import { IAuthErrorMessageProps } from './AuthErrorMessage.props'
import styles from './AuthErrorMessage.module.css'

export const AuthErrorMessage = ({ children }: IAuthErrorMessageProps) => {

  return (
    <div className={styles['error-message']}>
      <div>
        <ErrorIcon fill="var(--background-color)" />
      </div>
      <span>{children}</span>
    </div>
  )
}