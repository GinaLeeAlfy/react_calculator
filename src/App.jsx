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
  const [currentAnswerDisplay, setCurrentAnswerDisplay] = useState("0");
  const [currentAnswer, setCurrentAnswer] = useState("0");
  const [lastNumber, setLastNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [operatorDisplay, setOperatorDisplay] = useState("");

  const [isClearNeeded, setIsClearNeeded] = useState(false);
  const [isClear, setIsClear] = useState(true);
  const [isOperatorSet, setIsOperatorSet] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false);
  const [isLastInputNumber, setIsLastInputNumber] = useState(true);
  const [isCalculated, setIsCalculated] = useState(true);

  //handle number
  const handleNumber = (num) => {
    if (num === ".") {
      if (isCalculated || isOperatorSet) {
        setCurrentAnswer("0.");
        setCurrentAnswerDisplay("0.");
        setIsDecimal(true);
      } else if (!isDecimal) {
        setCurrentAnswer(currentAnswer + num);
        setCurrentAnswerDisplay(currentAnswer + num);
        setIsDecimal(true);
      }
    } else {
      if (isClear) {
        setCurrentAnswer(num);
        setCurrentAnswerDisplay(num);
      } else if (isCalculated || (isOperatorSet && !isLastInputNumber)) {
        setLastNumber(currentAnswer);
        setCurrentAnswer(num);
        setCurrentAnswerDisplay(num);
      } else if (currentAnswer === "0") {
        return;
      } else {
        setCurrentAnswer(currentAnswer + num);
        setCurrentAnswerDisplay(currentAnswer + num);
      }
    }
    setIsLastInputNumber(true);
    setIsCalculated(false);
    setIsClear(false);
  };
  //handle operator
  const handleOperator = (operatorText) => {
    setOperatorDisplay(operatorText);
    if (lastNumber === "") {
      setDisplay(`${currentAnswer} ${operatorText}`);
      setLastNumber(currentAnswer);
      setIsCalculated(false);
    } else if (!isCalculated && !isLastInputNumber) {
      setDisplay(`${lastNumber} ${operatorText}`);
      setIsCalculated(false);
    } else if (!isCalculated && isLastInputNumber) {
      calculateExpression(operatorText);
    } else if (isCalculated) {
      setDisplay(`${lastNumber} ${operatorText}`);
      setIsCalculated(false);
    }

    setIsLastInputNumber(false);
    setIsOperatorSet(true);
    setIsClear(false);
  };
  //handle other
  const handleOther = (action) => {};
  //calc expression

  const calculateExpression = (operatorText) => {
    let total;
    switch (operator) {
      case "add":
        total = Number(lastNumber) + Number(currentAnswer);
        break;
      case "subtract":
        total = Number(lastNumber) - Number(currentAnswer);
        break;
      case "divide":
        if (currentAnswer === "0") {
          total = "Cannot Divide by 0";
          clearCalculator();
        } else {
          total = Number(lastNumber) / Number(currentAnswer);
        }
        break;
      case "multiply":
        total = Number(lastNumber) * Number(currentAnswer);
        break;
      default:
        break;
    }
    total = total.toString();

    if (total === "Cannot Divide by 0") {
      setDisplay(`${lastNumber} ${operatorText}`);
      setCurrentAnswer("0");
      setIsClearNeeded(true);
    } else {
      setLastNumber(total);
      setDisplay(`${total} ${operatorText}`);
      setCurrentAnswer(total);
    }

    setCurrentAnswerDisplay(total);
    setIsCalculated(true);
  };

  const clearCalculator = () => {
    setDisplay("");
    setCurrentAnswerDisplay("0");
    setCurrentAnswer("0");
    setLastNumber("");
    setOperator("");
    setOperatorDisplay("");

    setIsClearNeeded(false);
    setIsClear(true);
    setIsOperatorSet(false);
    setIsDecimal(false);
    setIsLastInputNumber(true);
    setIsCalculated(true);
  };

  //key listener
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    console.log(key);
  });

  //button listener
  const grabInfo = (e) => {
    if (isClearNeeded) {
      clearCalculator();
    }
    const targetTagName = e.target.tagName;
    const targetText = e.target.innerText;
    const targetClassName = e.target.className;

    if (targetTagName === "BUTTON") {
      if (targetText !== "") {
        if (!Number.isNaN(targetText)) {
          handleNumber(targetText);
        }
      } else {
        switch (targetClassName) {
          case "subtract":
            setOperator(targetClassName);
            // handleOperator("&minus;");
            handleOperator("-");
            break;
          case "add":
            setOperator(targetClassName);
            // handleOperator("&plus;");
            handleOperator("+");
            break;
          case "divide":
            setOperator(targetClassName);
            // handleOperator("&divide;");
            handleOperator("/");
            break;
          case "multiply":
            setOperator(targetClassName);
            // handleOperator("&times;");
            handleOperator("*");
            break;
          case "back":
            handleOther(targetClassName);
            break;
          case "clear":
            console.log("anything");
            clearCalculator();
            break;
          case "clear-entry":
            handleOther(targetClassName);
            break;
          case "equals":
            calculateExpression(operatorDisplay);
            break;

          default:
            break;
        }
      }
    }
  };

  return (
    <div className="container">
      <Screen display={display} currentAnswerDisplay={currentAnswerDisplay} />
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
