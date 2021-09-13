import { useState } from "react";
import QuestionCard from './QuestionCard';

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [resultsArray, setResultsArray] = useState<any[]>([]);
  const [number, setNumber] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const TOTAL_QUESTIONS = 10

  const getQuizQuestions = async () => {
    const localUrl = "http://localhost:3000/questions";
    const response = await fetch(localUrl).then((response) => response.json());
    const questions = response.sort(() => Math.random() - 0.5);
    setQuizQuestions(questions);
    console.log("API RESPONSE IS: ", response);
  };

  const addValues = (event: React.MouseEvent<HTMLButtonElement>) => {
        let values = event.currentTarget.value.split(',').join(''); //removes any extra commas
        let valuesArray = Array.from(values) 
        let valuesInt = valuesArray.map((value) => { //turns each array value into an integer
            return parseInt(value, 10)
        })
        setResultsArray([...resultsArray, ...valuesInt]);
  }

  const nextQuestion = () => {
      const nextQuestion = number + 1;
      if(nextQuestion === TOTAL_QUESTIONS) {
          setQuizOver(true)
      } else {
          setNumber(nextQuestion)
      }     
  }

  const getResults = async () => {
      //find out which number in the results array is the most common, if there is more than one, randomize them and then do a fetch request from the API with character results.
  }

  return (
    <>
      <h1>Hi I am a quiz component!</h1>
      <button type="button" onClick={getQuizQuestions}>
        Start Quiz
      </button>
      {quizQuestions.length > 0 && !quizOver
        ? 
            <QuestionCard
             totalQuestions={TOTAL_QUESTIONS}
             question={quizQuestions[number].question}
             answer1={quizQuestions[number].answers[0].answer}
             answer1CharacterValues={quizQuestions[number].answers[0].character_values}
             answer2={quizQuestions[number].answers[1].answer}
             answer2CharacterValues={quizQuestions[number].answers[1].character_values}
             answer3={quizQuestions[number].answers[2].answer}
             answer3CharacterValues={quizQuestions[number].answers[2].character_values}
             answer4={quizQuestions[number].answers[2].answer}
             answer4CharacterValues={quizQuestions[number].answers[2].character_values}
             addValues={addValues}
            />
        : null}
    {!quizOver && number !== TOTAL_QUESTIONS -1 ? (
      <button type="button" onClick={nextQuestion}>NEXT</button>
    ): <button type="button" onClick={getResults}>GET RESULTS</button>}
    </>
  );
};

export default Quiz;
