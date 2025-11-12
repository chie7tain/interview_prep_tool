import { createContext, useContext, useMemo, useState } from "react";
// 1. Create Context
const CounterContext = createContext({
  count: 0,
  increment: () => {},
  decrement: () => {},
});

// 2. Create a Parent Component that provides the context value to its children
const btnStyle = {
  margin: "0 5px",
  padding: "5px 10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
};
const counterStyle = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: "20px",
  fontFamily: "Arial, sans-serif",
};
const counterValueStyle = {
  margin: "0 10px",
  fontWeight: "bold",
  minWidth: "20px",
  textAlign: "center",
};
const labelStyle = {
  fontSize: "18px",
  marginRight: "10px",
};
function Counter({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const values = useMemo(
    () => ({
      count,
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
    }),
    [count]
  );

  return (
    <CounterContext.Provider value={values}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to help implementing the common tasks
function Label({ children }: { children: React.ReactNode }) {
  return <span style={labelStyle}>{children}</span>;
}
function CountDisplay() {
  const { count } = useContext(CounterContext);
  return <span style={counterStyle}>{count}</span>;
}
function Increment({ icon }: { icon: string }) {
  const { increment } = useContext(CounterContext);
  return (
    <button style={btnStyle} onClick={increment}>
      {icon}
    </button>
  );
}
function Decrement({ icon }: { icon: string }) {
  const { decrement } = useContext(CounterContext);
  return (
    <button style={btnStyle} onClick={decrement}>
      {icon}
    </button>
  );
}
// 4. add child components as properties to the parent component
Counter.Label = Label;
Counter.CountDisplay = CountDisplay;
Counter.Increment = Increment;
Counter.Decrement = Decrement;

export default Counter;
