import "./Result.css";

const Result = ({ score, time, restart }) => {
  time = Math.floor(time / 100);

  return (
    <div className="result">
      <div>
        <h2 className="score">Your score is : {score}</h2>
        <h2 className="time">Time : {time} second</h2>
        <button className="btn restart" onClick={restart}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default Result;
