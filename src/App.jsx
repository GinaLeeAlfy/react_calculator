import { createRoot } from "react-dom/client";
import { useState } from "react";
import Screen from "./Screen";

const App = () => {
  const [display, setDisplay] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("0");
  const [operator, setOperator] = useState("");

  return (
    <div>
      <Screen display={display} currentAnswer={currentAnswer} />
      <div className="buttons">
        <div className="row">
          <button>CE</button>
          <button>C</button>
          <button>back</button>
          <button>/</button>
        </div>
        <div className="row">
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>*</button>
        </div>
        <div className="row">
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>-</button>
        </div>
        <div className="row">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>+</button>
        </div>
        <div className="row">
          <button>0</button>
          <button>.</button>
          <button>=</button>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
