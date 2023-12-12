import { bookService } from "../services/book.service.js"
import { LongText } from "./LongText.jsx"
import { AddReview } from "./AddReview.jsx"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../services/event-bus.service.js"

const { Link, useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [review, setReview] = useState(bookService.getEmptyReview())
    const prevBook = useRef()
    const nextBook = useRef()
    const thumbnail = useRef('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
            bookService.get(params.bookId),
            bookService.getPrevBook(params.bookId),
            bookService.getNextBook(params.bookId),
        ]).then(([book, nBook, pBook]) => {
            setBook(book)
            prevBook.current = pBook
            nextBook.current = nBook
            thumbnail.current = book.thumbnail.split('/').slice(-1)
        }).catch(err => {
            console.error(err)
            navigate('/books')
        })
    }, [params.bookId])

    function onAddReview(review) {
        return bookService.addReview(params.bookId, review)
            .then(book => {
                setBook(book)
                showSuccessMsg('Book reviewed successfully')
            })
            .catch(err => {
                console.error(err)
                showErrorMsg('Error reviewing book')
            })
    }

    function onPrevBook() {
        setBook(null)
        navigate(`/books/${prevBook.current.id}`)
    }

    function onNextBook() {
        setBook(null)
        navigate(`/books/${nextBook.current.id}`)
    }

    if (! book) return <main className="loading">Loading...</main>
    return (
        <main className="book-details">
            <h2>Book Details</h2>
            <img src={`assets/img/${thumbnail.current}`} alt="thumbnail" />
            <p className="book-details-p">
                <LongText text={JSON.stringify(book)} />
            </p>
            <AddReview review={review} onAddReview={onAddReview}/>
            <Link to={`/books/edit/${book.id}`}>
                <button>Edit</button>
            </Link>
            <button className="prev" onClick={onPrevBook}>
                Prev
            </button>
            <button className="next" onClick={onNextBook}>
                Next
            </button>
            <button className="back" onClick={() => navigate('/books')}>
                Back
            </button>
        </main>
    )
}