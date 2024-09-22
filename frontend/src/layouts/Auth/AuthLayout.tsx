import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { ToggleThemeButton } from '../../components/ToggleThemeButton/ToggleThemeButton';
import cn from 'classnames';
import { useThemeStore } from '../../stores/theme.store';
import { Logo } from '../../components/Logo/Logo';

function AuthLayout() {
  const theme = useThemeStore(state => state.theme);

  return (
    <div className={cn(styles['layout'], theme)}>
      <header className={styles['header']}>
        <div className={styles['logo']}>
          <Logo fill={'var(--text-color)'} />
        </div>

        <ToggleThemeButton />
      </header>

      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;