import { useContext } from "react";
import { CounterContext } from "./CounterProvider";

function CounterAction() {
  const { setCount } = useContext(CounterContext);

  const onClick = () => setCount((count) => count + 1);

  return <button onClick={onClick}>Click me</button>;
}

export default CounterAction;
