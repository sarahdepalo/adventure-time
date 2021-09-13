import { useState } from "react";
import QuestionCard from "./QuestionCard";
import Results from "./Results";
// TO DO:
//Write the restart button
//Fix any small bugs (getting rid of next button at the start - or just loading questions at mount)
//Write the rest of the character profiles
//Start some css, maybe use styled components this time?

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [resultsArray, setResultsArray] = useState<any[]>([]);
  const [number, setNumber] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [quizResult, setQuizResult]: any = useState({});

  const TOTAL_QUESTIONS = 10;

  const getQuizQuestions = async () => {
    const localUrl = "http://localhost:3000/questions";
    const response = await fetch(localUrl).then((response) => response.json());
    const questions = response.sort(() => Math.random() - 0.5);
    setQuizQuestions(questions);
    console.log("API RESPONSE IS: ", response);
  };

  const addValues = (event: React.MouseEvent<HTMLButtonElement>) => {
    let values = event.currentTarget.value.split(",").join(""); //removes any extra commas
    let valuesArray = Array.from(values);
    let valuesInt = valuesArray.map((value) => {
      //turns each array value into an integer
      return parseInt(value, 10);
    });
    setResultsArray([...resultsArray, ...valuesInt]);
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS - 1) {
      setQuizOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const getResults = async () => {
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
    const localUrl = `http://localhost:3000/results/1`;
    const characterResults = await fetch(localUrl).then((response) =>
      response.json()
    );
    console.log(characterResults);
    setQuizResult(characterResults);
  };

  return (
    <>
      {!quizOver ? (
        <button type="button" onClick={getQuizQuestions}>
          Start Quiz
        </button>
      ) : null}

      {quizQuestions.length > 0 && !quizOver ? (
        <QuestionCard
          totalQuestions={TOTAL_QUESTIONS}
          number={number}
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
      {!quizOver && number !== TOTAL_QUESTIONS - 1 ? (
        <button type="button" onClick={nextQuestion}>
          NEXT
        </button>
      ) : (
        <button type="button" onClick={getResults}>
          GET RESULTS
        </button>
      )}

      {!!quizOver && quizResult !== null ? (
        <Results
          character_img={quizResult.character_img}
          results_text={quizResult.results_text}
          character_name={quizResult.character_name}
        />
      ) : null}
    </>
  );
};

export default Quiz;
