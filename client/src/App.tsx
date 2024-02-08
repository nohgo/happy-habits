import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/habits")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
