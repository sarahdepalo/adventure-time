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
            <img src={`http://localhost:3000/images/${character_img}`} alt={character_name} />
            <p>{results_text}</p>
            <TwitterShareButton
            character_name={character_name}
            url={''}
            options={{text: `I took the Adventure Time Quiz and got ${character_name}!`}}
            />
        </div>
    )
}

export default Results;