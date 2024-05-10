import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClickGetUsers = () => {
    
  }
  return (
    <div className="main">
      <div className="card">
        <h3>count is {count}</h3>
        <button onClick={() => setCount((count) => count + 1)}>
          Increase
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrease
        </button>
      </div>
      <div className="card">
        <button onClick={handleClickGetUsers}>
          Get Users
        </button>
        <h3>Users:</h3>
        
      </div>
    </div>
  );
}

export default App;
