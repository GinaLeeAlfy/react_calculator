import { createRoot } from "react-dom/client";
import { useState } from "react";

const App = () => {
  const [isDisplay, setDisplay] = useState("");

  return (
    <div>
      <div className="screen">
        <h1>{isDisplay}</h1>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
