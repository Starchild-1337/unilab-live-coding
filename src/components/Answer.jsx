import "./Answer.css";

const Answer = ({ hex, answer, handleAnswer }) => {
  return (
    <li
      className={answer === hex ? "answer active" : "answer"}
      onClick={() => handleAnswer(hex)}
    >
      {hex}
    </li>
  );
};

export default Answer;
