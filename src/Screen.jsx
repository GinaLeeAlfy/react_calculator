const Screen = ({ display, currentAnswerDisplay }) => {
  return (
    <div className="screen">
      <p>{display}</p>
      <h1>{currentAnswerDisplay}</h1>
    </div>
  );
};

export default Screen;
