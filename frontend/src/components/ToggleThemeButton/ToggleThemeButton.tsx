import { useThemeStore } from '../../stores/theme.store';
import { DarkIcon } from '../../icons/DarkTheme.icon';
import { LigthIcon } from '../../icons/LightTheme.icon';
import { IconButton } from '../IconButton/IconButton';

export function ToggleThemeButton() {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  return (
    <IconButton size='medium' outlined onClick={(toggleTheme)} onMouseDown={e => e.preventDefault()}>
      {theme === 'dark'
        ? <LigthIcon height={16} width={16} fill='var(--placeholder-color)' />
        : <DarkIcon height={16} width={16} fill='var(--placeholder-color)' />
      }
    </IconButton>
  )
}