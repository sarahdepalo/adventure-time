import { useState } from "react";

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  const getQuizQuestions = async () => {
    const localUrl = "http://localhost:3000/questions";
    const response = await fetch(localUrl).then((response) => response.json());
    const questions = response.sort(() => Math.random() - 0.5);
    setQuizQuestions(questions);
    console.log("API RESPONSE IS: ", response);
  };

  const addValues = (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(event.currentTarget.value.replace(/,\s*$/, ""));
  }

  return (
    // be able to map through questions and display a quesiton card for each question.
    // Each question needs to have answers that each have a corresponding character value that gets added to an array. That array will determine which character they get at the end
    <>
      <h1>Hi I am a quiz component!</h1>
      <button type="button" onClick={getQuizQuestions}>
        Start Quiz
      </button>
      {quizQuestions.length > 0
        ? quizQuestions.map((question, index) => (
            <div key={`${question.question}-${index}`}>
              <p>{question.question}</p>
              <button
                value={[
                  question.answers[0].character_value,
                  question.answers[0].character_value2 !== null
                    ? question.answers[0].character_value2
                    : null,
                  question.answers[0].character_value3 !== null
                    ? question.answers[0].character_value3
                    : null
                ]}
                onClick={(event) => addValues(event)}
              >
                {question.answers[0].answer}
              </button>
              <p>{question.answers[1].answer}</p>
              <p>{question.answers[2].answer}</p>
              <p>{question.answers[3].answer}</p>
            </div>
          ))
        : null}
      <button type="button">Get Results!</button>
    </>
  );
};

export default Quiz;
