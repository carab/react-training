import { useState } from "react";

function Random({multiple}) {
  const [random, setRandom] = useState(null);

  function handleClick() {
    setRandom(Math.random())
  };

  return <button onClick={handleClick}>Random: {Math.ceil(random*multiple)}</button>;
}

export default Random;
