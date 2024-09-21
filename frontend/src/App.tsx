import { useState } from "react";
import { Button } from "./components/Button/Button";
import Input from './components/Input/Input';

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((s) => s + 1);
  };

  return (
    <>
      <div>
        <Button size="small" onClick={increaseCount}>
          Small Button
        </Button>
        <Button size="medium" onClick={increaseCount}>
          Medium Button
        </Button>
        <Button size="big" onClick={increaseCount}>
          Big Button
        </Button>
      </div>
      <div>
        <Button accent={true} size="small" onClick={increaseCount}>
          Small Button
        </Button>
        <Button accent={true} size="medium" onClick={increaseCount}>
          Medium Button
        </Button>
        <Button accent={true} size="big" onClick={increaseCount}>
          Big Button
        </Button>
      </div>
      <div>
        <Input placeholder='Input' />
      </div>
      <div>
        <Input placeholder='Input' isValid={false} />
      </div>
      {count}
    </>
  );
}

export default App;
