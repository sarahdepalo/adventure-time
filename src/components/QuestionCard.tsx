type Props = {
    totalQuestions: number,
    number:number,
    question: string,
    answer1: string,
    answer1CharacterValues: string[],
    answer2: string,
    answer2CharacterValues: string[],
    answer3: string,
    answer3CharacterValues: string[],
    answer4: string,
    answer4CharacterValues: string[],
    addValues: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: React.FC<Props> = ({totalQuestions, number, question, answer1, answer1CharacterValues, answer2, answer2CharacterValues, answer3, answer3CharacterValues, answer4, answer4CharacterValues, addValues}) => {
    return (
        //add in a progress bar and replace these numbers later!
        <>
        <p>{number}/{totalQuestions}</p>
        <h3>{question}</h3>
        <button type="button" onClick={(event) => addValues(event)} value={answer1CharacterValues}>{answer1}</button>
        <button type="button" onClick={(event) => addValues(event)} value={answer2CharacterValues}>{answer2}</button>
        <button type="button" onClick={(event) => addValues(event)} value={answer3CharacterValues}>{answer3}</button>
        <button type="button" onClick={(event) => addValues(event)} value={answer4CharacterValues}>{answer4}</button>
        </>
    )
}

export default QuestionCard