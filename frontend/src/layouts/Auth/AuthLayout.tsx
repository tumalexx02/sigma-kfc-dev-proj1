import { Link, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import cn from 'classnames';
import { Logo } from '../../components/Logo/Logo';
import { ToggleThemeButton } from '../../components/ToggleThemeButton/ToggleThemeButton';
import { MouseEvent } from 'react';

function AuthLayout() {

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className={cn(styles['layout'])}>
      <header className={styles['header']}>
        <Link to='/' className={styles['logo']} onClick={handleClick}>
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