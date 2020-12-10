import { createContext, useContext, useState } from "react";

const CounterContext = createContext(null);

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const parentContext = useContext(CounterContext);

  return (
    <CounterContext.Provider value={parentContext ? parentContext : { count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}

export {
    CounterProvider as default,
    CounterContext
};
