import {TwitterShareButton} from 'react-twitter-embed';

type Props = {
    character_img: string,
    results_text: string,
    character_name: string
}

const Results: React.FC<Props> = ({character_img, results_text, character_name}) => {
    return (
        <div className="results">
            <h2>You Got {character_name}!</h2>
            <img src={`https://adventure-time-quiz.herokuapp.com/images/${character_img}`} alt={character_name} />
            <p>{results_text}</p>
            <TwitterShareButton
            character_name={character_name}
            url={''}
            options={{text: `I took the Adventure Time Personality Quiz and got ${character_name}! Take the quiz to find out who you get`}}
            />
        </div>
    )
}

export default Results;