import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {
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
        const message = params.bookId ? 'edited' : 'saved'
        bookService.save(book)
            .then(books => {
                showSuccessMsg(`Book ${message} successfully`)
                navigate('/books')
            })
            .catch(err => {
                console.error(err)
                showErrorMsg(`Error: Book not ${message}`)
            })
    }

    function onBack() {
        if (params.bookId) navigate(`/books/${params.bookId}`)
        else navigate('/books')
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
                <button className="back" onClick={onBack}>Back</button>
            </form>
        </main>
    )
}