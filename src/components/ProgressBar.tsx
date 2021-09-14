type Props = {
    completed: number
}

const ProgressBar: React.FC<Props> = ({completed}) => {
    const containerStyles = {
        height: 25,
        backgroundColor: "#F1FDFF",
        borderRadius: 50,
        margin: '0 auto'
      }
    
      const fillerStyles = {
        background: 'linear-gradient(to left, #0963E6, #0BC3E8)',
        boxShadow: '0 3px 3px -5px #0963E6, 0 2px 5px #0963E6',
        height: '100%',
        width: `${completed}%`,
        transition: '1s ease 0.3s',
        borderRadius: 'inherit',
    
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',

      }
    return (
        <div style={containerStyles} className="progress-bar">
            <div style={fillerStyles}>
                <span style={labelStyles}></span>
            </div>
        </div>
    )
}

export default ProgressBar