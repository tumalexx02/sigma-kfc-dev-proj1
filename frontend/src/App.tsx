import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const increaseCount = () => {
    setCount(s => s + 1);
  }

  return (
    <>
      <button onClick={increaseCount}>Current count state: {count}</button>
    </>
  )
}

export default App
