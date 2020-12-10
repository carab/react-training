import { useState } from "react";

function Horloge() {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount((count) => count + 1)
  }

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        Increment
      </button>
    </div>
  )
}

export default Horloge;
