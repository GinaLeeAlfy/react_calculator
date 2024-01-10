import { IconTrash } from "@tabler/icons-react";

const History = ({ expressions, setExpressions }) => {
  const deleteHistory = () => {
    setExpressions([]);
  };
  return (
    <div className="history">
      <div className="flex-col">
        {!expressions.length ? (
          <p>No History yet</p>
        ) : (
          expressions.map((element) => (
            <div className="flex-col no-pad" key={element.id}>
              <p>{element.expression}</p>
              <h2>{element.answer}</h2>
            </div>
          ))
        )}
      </div>
      <button onClick={deleteHistory}>
        <IconTrash />
      </button>
    </div>
  );
};

export default History;
