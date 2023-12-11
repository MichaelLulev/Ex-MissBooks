import { bookService } from "../services/book.service.js"
import { LongText } from "./LongText.jsx"

const { useState, useEffect, useRef } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)
    const thumbnail = useRef('')
    useEffect(() => {
        bookService.get(bookId).then(book => {
            setBook(book)
            thumbnail.current = book.thumbnail.split('/').slice(-1)
        })
    }, [])
    return (
        <section className="book-details">
            <h2>Book Details</h2>
            {
                book && <img src={`assets/img/${thumbnail.current}`} alt="book-thumbnail" />
            }
            <p className="book-details-p">
                {
                    ! book && 'Loading...'
                }
                {
                    // book && JSON.stringify(book)
                    book && <LongText text={JSON.stringify(book)} />
                }
            </p>
            <button className="back" onClick={onBack}>
                Back
            </button>
        </section>
    )
}