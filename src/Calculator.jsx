import { useState } from "react";
import Screen from "./Screen";
import Buttons from "./Buttons";

const Calculator = ({ expressions, setExpressions }) => {
  const [display, setDisplay] = useState("");
  const [currentAnswerDisplay, setCurrentAnswerDisplay] = useState("0");

  return (
    <div className="calc-container">
      <Screen display={display} currentAnswerDisplay={currentAnswerDisplay} />
      <Buttons
        currentAnswerDisplay={currentAnswerDisplay}
        setCurrentAnswerDisplay={setCurrentAnswerDisplay}
        setDisplay={setDisplay}
        expressions={expressions}
        setExpressions={setExpressions}
      />
    </div>
  );
};

export default Calculator;
