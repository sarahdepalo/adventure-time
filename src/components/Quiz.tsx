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
  // Progress Bar Props
  const [completed, setCompleted]: any = useState(0);

  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const getQuizQuestions = async () => {
    const localUrl = "http://localhost:3000/questions";
    const response = await fetch(localUrl).then((response) => response.json());
    const questions = response.sort(() => Math.random() - 0.5);
    setQuizQuestions(questions);
  };

  const addValues = (event: React.MouseEvent<HTMLButtonElement>) => {
    let values = event.currentTarget.value.split(",").join(""); //removes any extra commas
    let valuesArray = Array.from(values);
    let valuesInt = valuesArray.map((value) => {
      return parseInt(value, 10);
    });
    setResultsArray([...resultsArray, ...valuesInt]);
  };

  const nextQuestion = () => {
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
    setCompleted(completed + 10);
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
    const localUrl = `http://localhost:3000/results/${value}`;
    const characterResults = await fetch(localUrl).then((response) =>
      response.json()
    );
    console.log(characterResults);
    setQuizResult(characterResults);
  };

  const restartQuiz = () => {
    setQuizOver(false);
    setNumber(0);
    setCompleted(0);
    setResultsArray([]);
    setQuizResult({});
    getQuizQuestions();
  };

  return (
    <>
      <main className="container">
        <h1>Adventure Time Quiz!</h1>
        <p>Find out which character you're most like by taking the quiz below.</p>
        <ProgressBar completed={completed}/>
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
          <button type="button" onClick={nextQuestion}>
            NEXT
          </button>
        ) : null}
        {!quizOver && number === 9 ? (
          <button type="button" onClick={getResults}>
            GET RESULTS
          </button>
        ) : null}
        {!!quizOver ? (
          <button type="button" onClick={restartQuiz}>
            RESTART
          </button>
        ) : null}

        {!!quizOver && quizResult !== null ? (
          <Results
            character_img={quizResult.character_img}
            results_text={quizResult.results_text}
            character_name={quizResult.character_name}
          />
        ) : null}
      </main>
    </>
  );
};

export default Quiz;
