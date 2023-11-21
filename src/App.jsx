import { useEffect, useRef, useState } from "react";
import "./App.css";
import Answer from "./components/Answer";
import Result from "./components/Result";

function App() {
  const [colors, setColors] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(0);

  const page = questionIndex + 1;

  const score = useRef(200);
  const getColors = async () => {
    const res = await fetch("https://random-colors-lovat.vercel.app/");
    const data = await res.json();
    setColors(data);
  };

  useEffect(() => {
    getColors();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (questionIndex > 0) {
        setTimer((t) => t + 1);
      }
    }, 10);

    if (questionIndex === colors.length) clearInterval(interval);

    return () => clearInterval(interval);
  }, [questionIndex, colors.length]);

  const handleAnswer = (hex) => {
    setAnswer(hex);
  };

  const handleContinue = () => {
    const correctAnswer = colors[questionIndex].color;

    if (!answer) return;

    if (answer !== correctAnswer) {
      score.current -= 20;
    }
    setAnswer("");
    setQuestionIndex((prev) => {
      if (prev + 1 <= colors.length) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleRestart = () => {
    getColors();
    setColors([]);
    setQuestionIndex(0);
    setTimer(0);
    score.current = 200;
  };

  if (colors.length === 0) return <h1>loading</h1>;

  if (questionIndex === colors.length) {
    return (
      <main>
        <Result score={score.current} time={timer} restart={handleRestart} />
      </main>
    );
  }

  return (
    <main>
      <span className="quiz-points quiz-span">200</span>
      <span className="quiz-page quiz-span">
        {page}/{colors.length}
      </span>
      <section className="quiz">
        <h1>Color Quiz</h1>
        <h3>color:</h3>
        <br />
        <div
          className="color"
          style={{ backgroundColor: colors[questionIndex].color }}
        ></div>
        <ul className="colors">
          {colors[questionIndex].answers.map((hex) => (
            <Answer
              key={hex}
              hex={hex}
              answer={answer}
              handleAnswer={handleAnswer}
            />
          ))}
        </ul>
        <button className="btn" onClick={handleContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

export default App;
