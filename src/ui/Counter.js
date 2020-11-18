import { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);

  function handleIncLater() {
      setTimeout(() => {
          setCounter(function (counter) {
              return counter + 1
          });
      }, 5000)
  }

  function handleInc() {
      setCounter(counter + 1);
  }

  return (
    <>
      <button onClick={handleInc}>increment</button>
      <button onClick={handleIncLater}>increment later</button>
      <div id="disp">value={counter}</div>
    </>
  );
}

export default Counter