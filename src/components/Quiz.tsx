import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Results from "./Results";
import ProgressBar from "./ProgressBar";

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [resultsArray, setResultsArray] = useState<any[]>([]);
  const [number, setNumber] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [quizResult, setQuizResult]: any = useState({});
  const [isClicked, setIsClicked] = useState(false);

  // Progress Bar Props
  const [completed, setCompleted]: any = useState(10);

  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const getQuizQuestions = async () => {
    const url = "https://adventure-time-quiz.herokuapp.com/questions";
    const response = await fetch(url).then((response) => response.json());
    const questions = response.sort(() => Math.random() - 0.5);
    setQuizQuestions(questions);
  };

  const addValues = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    let values = event.currentTarget.value.split(",").join(""); //removes any extra commas
    let valuesArray = Array.from(values);
    let valuesInt = valuesArray.map((value) => {
      return parseInt(value, 10);
    });
    setResultsArray([...resultsArray, ...valuesInt]);
  };

  const nextQuestion = () => {
    setIsClicked(false);
    const nextQuestion = number + 1;
    setCompleted(completed + 10);
    if (nextQuestion === TOTAL_QUESTIONS) {
      setQuizOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  //Takes an array and finds the most common value.
  const getResults = async () => {
    setIsClicked(false);
    setQuizOver(true);
    let maxFreq = 1;
    let counter = 0;
    let value;

    for (let i = 0; i < resultsArray.length; i++) {
      for (let j = 1; j < resultsArray.length; j++) {
        if (resultsArray[i] === resultsArray[j]) {
          counter++;
        }
        if (maxFreq < counter) {
          maxFreq = counter;
          value = resultsArray[i];
        }
      }
      counter = 0;
    }
    console.log(value);
    const url = `https://adventure-time-quiz.herokuapp.com/results/${value}`;
    const characterResults = await fetch(url).then((response) =>
      response.json()
    );
    console.log(characterResults);
    setQuizResult(characterResults);
  };

  const restartQuiz = () => {
    setQuizOver(false);
    setNumber(0);
    setCompleted(10);
    setResultsArray([]);
    setQuizResult({});
    getQuizQuestions();
  };

  return (
    <>
      <main className="container">
        <h1>Adventure Time Quiz!</h1>
        <p>
          Find out which character you're most like by taking the quiz below.
        </p>
        {!quizOver ? <ProgressBar completed={completed} /> : null}

        {quizQuestions.length > 0 && !quizOver ? (
          <QuestionCard
            question={quizQuestions[number].question}
            answer1={quizQuestions[number].answers[0].answer}
            answer1CharacterValues={
              quizQuestions[number].answers[0].character_values
            }
            answer2={quizQuestions[number].answers[1].answer}
            answer2CharacterValues={
              quizQuestions[number].answers[1].character_values
            }
            answer3={quizQuestions[number].answers[2].answer}
            answer3CharacterValues={
              quizQuestions[number].answers[2].character_values
            }
            answer4={quizQuestions[number].answers[3].answer}
            answer4CharacterValues={
              quizQuestions[number].answers[3].character_values
            }
            addValues={addValues}
          />
        ) : null}
        {!quizOver && quizQuestions.length > 0 && number < 9 ? (
          <button
            type="button"
            onClick={nextQuestion}
            className={!!isClicked ? "secondary-btn" : "hidden"}
          >
            NEXT
          </button>
        ) : null}
        {!quizOver && number === 9 ? (
          <button
            type="button"
            onClick={getResults}
            className={!!isClicked ? "secondary-btn" : "hidden"}
          >
            GET RESULTS
          </button>
        ) : null}

        {!!quizOver && quizResult !== null ? (
          <Results
            character_img={quizResult.character_img}
            results_text={quizResult.results_text}
            character_name={quizResult.character_name}
          />
        ) : null}

        {!!quizOver ? (
          <button type="button" onClick={restartQuiz} className="secondary-btn">
            RESTART
          </button>
        ) : null}
      </main>
    </>
  );
};

export default Quiz;
