import { createRoot } from "react-dom/client";
import { useState } from "react";
import History from "./History";
import Calculator from "./Calculator";

const App = () => {
  const [expressions, setExpressions] = useState([]);

  return (
    <div className="container">
      <Calculator expressions={expressions} setExpressions={setExpressions} />
      <History expressions={expressions} setExpressions={setExpressions} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
