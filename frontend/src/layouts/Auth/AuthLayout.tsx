import { Link, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { ToggleThemeButton } from '../../components/ToggleThemeButton/ToggleThemeButton';
import cn from 'classnames';
import { Logo } from '../../components/Logo/Logo';

function AuthLayout() {

  return (
    <div className={cn(styles['layout'])}>
      <header className={styles['header']}>
        <Link to='/auth/login' className={styles['logo']}>
          <Logo fill={'var(--text-color)'} />
        </Link>

        <ToggleThemeButton />
      </header>

      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;