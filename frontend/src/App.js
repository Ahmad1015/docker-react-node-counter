import React, { useState, useEffect } from 'react';
import { getCounter, updateCounter } from './api';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCounter().then(data => setCount(data.value)).catch(() => setCount(0));
  }, []);

  const handleChange = async (delta) => {
    const newValue = count + delta;
    setCount(newValue);
    await updateCounter(newValue);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif"
    }}>
      <h1> Docker Counter</h1>
      <h2>{count}</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => handleChange(-1)}>-</button>
        <button onClick={() => handleChange(1)}>+</button>
      </div>
    </div>
  );
}

export default App;
