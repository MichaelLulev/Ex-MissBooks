import { bookService } from "../services/book.service.js"

const { Link, useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function BookEdit(props) {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.bookId) {
            bookService.get(params.bookId)
                .then(book => {
                    setBook(book)
                })
        } else {
            setBook(bookService.getEmptyBook())
        }
    }, [])

    function onChangeBook(ev) {
        const type = ev.target.type
        const name = ev.target.name
        let value = ev.target.value
        if (['number'].includes(type)) value = +value
        setBook(prevBook => ({ ...prevBook, [name]: value }))
    }

    function onSaveBookChanges(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => navigate("/books"))
            .catch(err => console.error(err))
    }
    
    if (! book) return <main className="loading">Loading...</main>
    return (
        <main className="book-edit">
            <form action="bood-edit-form">
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={onChangeBook}
                    />
                </label>
                <label>
                    <span>Published date:</span>
                    <input
                        type="number"
                        name="publishedDate"
                        value={book.publishedDate}
                        onChange={onChangeBook}
                    />
                </label>
                <button className="save" onClick={onSaveBookChanges}>Save</button>
            </form>
        </main>
    )
}