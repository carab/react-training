import { useState } from "react"

function Counter() {
    const [count, setCount] = useState(0)

    const onClick = (diff: number) => {
        setCount((count) => count + diff)
      }

    return (
        <div>
            <p>{count}</p>
            <button type="button" onClick={() => onClick(1)}>Increment</button>
            <button type="button" onClick={() => onClick(-1)}>Decrement</button>
        </div>
    )
}

export default Counter