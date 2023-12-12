const { useState } = React

export function AddReview(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [review, setReview] = useState(props.review)
    
    function onChangeReview(ev) {
        const name = ev.target.name
        let value = ev.target.value
        setReview(prevReview => ({ ...prevReview, [name]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        props.onAddReview(review)
            .then(() => setReview(props.review))
    }

    return (
        <section className="add-review">
            <button
                onClick={() => setIsOpen(prevIsOpen => ! prevIsOpen)}
            >{isOpen ? 'Cancel' : 'Review'}
            </button>
        {
            isOpen &&
            <form className="add-review-form" onSubmit={onSaveReview} >
                <label>
                    <span>Name:</span>
                    <input
                        type="text"
                        name="name"
                        value={review.name}
                        onChange={onChangeReview}
                        required
                    />
                </label>
                <label>
                    <span>Rating:</span>
                    <select
                        name="rating"
                        value={review.rating}
                        onChange={onChangeReview}
                        required
                    >
                        <option value=""></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </label>
                <label>
                    <span>Read at:</span>
                    <input
                        type="date"
                        name="readAt"
                        value={review.readAt}
                        onChange={onChangeReview}
                        required
                    />
                </label>
                <button>Save</button>
            </form>
        }
        </section>
    )
}