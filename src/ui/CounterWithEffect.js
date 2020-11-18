import { useEffect, useState } from "react";

function CounterWithEffect() {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(function timeoutEffect() {
    const timeout = setTimeout(() => {
      console.log("Counter:")
      console.log(counter)
    }, 5000)

    return function timeoutEffectCleanup() {
      console.log('Cleanup counter log:')
      console.log(counter)
      clearTimeout(timeout)
    }
  }, [counter])

  function handleInc() {
      setCounter(counter => counter + 1);
  }

  return (
    <>
      <button onClick={handleInc}>increment</button>
      <button onClick={() => setPage(page => page+1)}>next</button>
      <div id="disp">value={counter}</div>
    </>
  );
}

export default CounterWithEffect