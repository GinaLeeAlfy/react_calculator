const Screen = ({ display, currentAnswer }) => {
  return (
    <div className="screen">
      <p>{display}</p>
      <h1>{currentAnswer}</h1>
    </div>
  );
};

export default Screen;
