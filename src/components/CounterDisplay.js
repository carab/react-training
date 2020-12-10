import { CounterContext } from "./CounterProvider";

function CounterDisplay() {
  return (
    <CounterContext.Consumer>
      {({ count }) => <p>Count: {count}</p>}
    </CounterContext.Consumer>
  );
}

export default CounterDisplay;
