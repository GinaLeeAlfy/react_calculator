import { createRoot } from "react-dom/client";
import { useState } from "react";
import Screen from "./Screen";
import {
  IconBackspace,
  IconDivide,
  IconMinus,
  IconPlus,
  IconX,
  IconEqual,
  IconLetterC,
  IconCe,
} from "@tabler/icons-react";

const App = () => {
  const [display, setDisplay] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("0");
  const [lastNumber, setLastNumber] = useState("");

  const [isOperatorSet, setIsOperatorSet] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false);
  const [isLastInputNumber, setIsLastInputNumber] = useState(true);
  const [isCalculated, setIsCalculated] = useState(true);

  //handle number
  const handleNumber = (num) => {
    if (num === ".") {
      if (isCalculated || isOperatorSet) {
        setCurrentAnswer("0.");
        setIsDecimal(true);
      } else if (!isDecimal) {
        setCurrentAnswer(currentAnswer + num);
        setIsDecimal(true);
      }
    } else {
      if (isCalculated) {
        setCurrentAnswer(num);
      } else {
        setCurrentAnswer(currentAnswer + num);
      }
    }
    setIsLastInputNumber(true);
    setIsCalculated(false);
  };
  //handle operator
  const handleOperator = (operator) => {
    // setOperator(operator);
    if (isLastInputNumber && !isOperatorSet) {
      setDisplay(`${currentAnswer} ${operator}`);
      setLastNumber(currentAnswer);
      setIsLastInputNumber(false);
      setIsOperatorSet(true);
    }
  };
  //handle other
  //key listener
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    console.log(key);
  });

  //button listener
  const grabInfo = (e) => {
    const targetTagName = e.target.tagName;
    const targetText = e.target.innerText;
    const targetClassName = e.target.className;

    if (targetTagName === "BUTTON") {
      if (targetText !== "") {
        console.log(targetText);
        if (!Number.isNaN(targetText)) {
          handleNumber(targetText);
        }
      } else {
        console.log(targetClassName);
        switch (targetClassName) {
          case "subtract":
            handleOperator("-");
            break;

          default:
            break;
        }
      }
    }
  };

  return (
    <div className="container">
      <Screen display={display} currentAnswer={currentAnswer} />
      <div className="buttons" onClick={grabInfo}>
        <div className="row">
          <button className="clear-entry">
            <IconCe />
          </button>
          <button className="clear">
            <IconLetterC />
          </button>
          <button className="back">
            <IconBackspace />
          </button>
          <button className="divide">
            <IconDivide />
          </button>
        </div>
        <div className="row">
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className="multiply">
            <IconX />
          </button>
        </div>
        <div className="row">
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button className="subtract">
            <IconMinus />
          </button>
        </div>
        <div className="row">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button className="add">
            <IconPlus />
          </button>
        </div>
        <div className="row">
          <button>0</button>
          <button>.</button>
          <button className="equals">
            <IconEqual />
          </button>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
