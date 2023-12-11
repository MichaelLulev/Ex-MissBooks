const { useState } = React

export function LongText(props) {
    const [isLong, setIsLong] = useState(false)

    function textToShow() {
        const text = props.text
        const length = props.length || 100
        if (text <= length || isLong) return text
        return text.slice(0, length) + '...'
    }

    function toggleIsLong() {
        setIsLong(prevIsLong => ! prevIsLong)
    }

    return (
        <span>
            <span>
                {textToShow()}
            </span>
            <button onClick={toggleIsLong}>{isLong ? 'Less' : 'More'}</button>
        </span>
    )
}