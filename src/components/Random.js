import { useState } from "react";

function Random() {
  const [random, setRandom] = useState(null);

  const onClick = () => setRandom(Math.ceil(Math.random() * 100))

  return (
    <div>
      <p>{random}</p>
      <button type="button" onClick={onClick}>
        Randomize
      </button>
    </div>
  );
}

export default Random;
