const { useState } = React

export function BookFilter(props) {
    const [filterBy, setFilterBy] = useState(props.filterBy)

    function onSetFilterBy(ev) {
        ev.preventDefault()
        props.onSetFilterBy(filterBy)
    }

    function onChangeFilterBy(ev) {
        const name = ev.target.name
        const type = ev.target.type
        let value = ev.target.value
        if (['number'].includes(type)) value = +value
        setFilterBy(prevFilterBy => {
            const newFilterBy = {...prevFilterBy, [name]: value}
            return newFilterBy
        })
    }

    return (
        <section className="book-filter">
            <h2>Book filter</h2>
            <form className="book-filter-form" onSubmit={onSetFilterBy}>
                <label>
                    <span>Title:</span>
                    <input
                        name="title"
                        type="text"
                        value={filterBy.title}
                        onChange={onChangeFilterBy} />
                </label>
                <label>
                    <span>From date:</span>
                    <input
                        name="publishedDateFrom"
                        type="number"
                        value={filterBy.publishedDateFrom} 
                        onChange={onChangeFilterBy}
                        min="-9999" max="9999" />
                </label>
                <label>
                    <span>To date:</span>
                    <input
                        name="publishedDateTo"
                        type="number"
                        value={filterBy.publishedDateTo}
                        onChange={onChangeFilterBy}
                        min="-9999" max="9999" />
                </label>
                <button>Filter</button>
            </form>
        </section>
    )
}