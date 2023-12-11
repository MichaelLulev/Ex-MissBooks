import { bookService } from "../services/book.service.js"
import { LongText } from "./LongText.jsx"

const { Link, useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function BookDetails() {
    const [book, setBook] = useState(null)
    const thumbnail = useRef('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
                thumbnail.current = book.thumbnail.split('/').slice(-1)
            })
            .catch(err => {
                console.error(err)
                navigate('/books')
            })
    }, [params.bookId])

    return (
        <section className="book-details">
            <h2>Book Details</h2>
        {
            book && <img src={`assets/img/${thumbnail.current}`} alt="book-thumbnail" />
        }
            <p className="book-details-p">
            {
                book && <LongText text={JSON.stringify(book)} /> || 'Loading...'
            }
            </p>
            <button className="back" onClick={() => navigate('/books')}>
                Back
            </button>
        </section>
    )
}