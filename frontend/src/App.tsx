import { MouseEvent, useContext, useState } from "react";
import { Button } from "./components/Button/Button";
import Input from './components/Input/Input';
import { ProtectedInput } from './components/ProtectedInput/ProtectedInput';
import { ThemeContext, ThemeContextType } from './context/theme.context';
import cn from 'classnames';
import { ToggleThemeButton } from './components/ToggleThemeButton/ToggleThemeButton';
import AuthLayout from './layouts/Auth/AuthLayout';

function App() {
  const [count, setCount] = useState(0);
  const { theme } = useContext<ThemeContextType>(ThemeContext)

  const increaseCount = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCount((s) => s + 1);
  };

  return (
    <AuthLayout />

    // <div className={cn(theme, 'dark-bg')}>
    //   <div className='demostrate'>
    //     <Button size="small" onClick={e => increaseCount(e)}>
    //       Small Button
    //     </Button>
    //     <Button size="medium" onClick={e => increaseCount(e)}>
    //       Medium Button
    //     </Button>
    //     <Button size="big" onClick={e => increaseCount(e)}>
    //       Big Button
    //     </Button>
    //   </div>
    //   <div className='demostrate'>
    //     <Button accent={true} size="small" onClick={e => increaseCount(e)}>
    //       Small Button
    //     </Button>
    //     <Button accent={true} size="medium" onClick={e => increaseCount(e)}>
    //       Medium Button
    //     </Button>
    //     <Button accent={true} size="big" onClick={e => increaseCount(e)}>
    //       Big Button
    //     </Button>
    //   </div>
    //   <div className='demostrate'>
    //     <Input placeholder='Input' />
    //   </div>
    //   <div className='demostrate'>
    //     <Input placeholder='Input' isValid={false} />
    //   </div>
    //   <div className='demostrate'>
    //     <ProtectedInput placeholder='Password' />
    //   </div>

    //   <div className='demostrate'>
    //     <Button size="big" onClick={e => increaseCount(e)}>
    //       Войти
    //     </Button>
    //     <Button size="big" onClick={e => increaseCount(e)}>
    //       Зарегистрироваться
    //     </Button>
    //   </div>
    //   <div className='demostrate'>
    //     <ToggleThemeButton />
    //   </div>
    //   {count}
    // </div>
  );
}

export default App;
