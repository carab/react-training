import { useEffect, useState } from "react";

function useInterval(parentCount: number) {
  const [count, setCount] = useState(parentCount)
  const [start, setStart] = useState(true)

  useEffect(function startIntervalEffect() {
    if (start) {
      const interval = setInterval(() => {
        setCount(count => count + 1)
      }, 1000)

      return function cleanupInterval() {
        clearInterval(interval)
      }
    }
  }, [start])

  useEffect(() => {
    setCount(parentCount)
  }, [parentCount])

  return [count, start, setStart] as const
}

type IntervalProps = {
  count: number;
  onUpdate(count: number): void;
}

function Interval({ count: parentCount, onUpdate }: IntervalProps) {
  const [count, start, setStart] = useInterval(parentCount)

  useEffect(() => {
    onUpdate(count)
  }, [count, onUpdate])

  return (
    <div>
      <p>Interval count: {count}</p>
      <button type="button" onClick={() => setStart(start => !start)}>
        {start ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default Interval;
