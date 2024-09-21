import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { ToggleThemeButton } from '../../components/ToggleThemeButton/ToggleThemeButton';
import cn from 'classnames';
import { useThemeStore } from '../../stores/theme.store';

function AuthLayout() {
  const theme = useThemeStore(state => state.theme);

  return (
    <div className={cn(styles['layout'], theme)}>
      <header className={styles['header']}>
        <div className={styles['logo']}>
          Logo
        </div>

        <ToggleThemeButton />
      </header>

      <div className={styles['content']}>
        <div className={styles['left-content']}>
          <img src="/dog.gif" alt="" draggable='false' />
        </div>
        <div className={styles['right-content']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;