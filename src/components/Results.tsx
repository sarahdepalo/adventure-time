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
            url={'https://adventure-time-quiz.netlify.app/'}
            options={{text: `Find out which character you are at `}}
            />
        </div>
    )
}

export default Results;