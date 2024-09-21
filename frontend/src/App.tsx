import { MouseEvent, useState } from "react";
import { Button } from "./components/Button/Button";
import Input from './components/Input/Input';
import { ProtectedInput } from './components/ProtectedInput/ProtectedInput';

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = (e: MouseEvent) => {
    e.preventDefault();
    setCount((s) => s + 1);
  };

  return (
    <>
      <div className='demostrate'>
        <Button size="small" onClick={e => increaseCount(e)}>
          Small Button
        </Button>
        <Button size="medium" onClick={e => increaseCount(e)}>
          Medium Button
        </Button>
        <Button size="big" onClick={e => increaseCount(e)}>
          Big Button
        </Button>
      </div>
      <div className='demostrate'>
        <Button accent={true} size="small" onClick={e => increaseCount(e)}>
          Small Button
        </Button>
        <Button accent={true} size="medium" onClick={e => increaseCount(e)}>
          Medium Button
        </Button>
        <Button accent={true} size="big" onClick={e => increaseCount(e)}>
          Big Button
        </Button>
      </div>
      <div className='demostrate'>
        <Input placeholder='Input' />
      </div>
      <div className='demostrate'>
        <Input placeholder='Input' isValid={false} />
      </div>
      <div className='demostrate'>
        <ProtectedInput placeholder='Password' />
      </div>

      <div className='demostrate'>
        <Button size="big" onClick={e => increaseCount(e)}>
          Войти
        </Button>
        <Button size="big" onClick={e => increaseCount(e)}>
          Зарегистрироваться
        </Button>
      </div>
      {count}
    </>
  );
}

export default App;
