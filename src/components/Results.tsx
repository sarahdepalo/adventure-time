type Props = {
    character_img: string,
    results_text: string,
    character_name: string
}

const Results: React.FC<Props> = ({character_img, results_text, character_name}) => {
    return (
        <>
        <h2>You Got {character_name}!</h2>
        <img src={`http://localhost:3000/images/${character_img}`} alt={character_name} />
        <p>{results_text}</p>
        </>
    )
}

export default Results;