import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [displayType, setDisplayType] = useState('gallery')
    useEffect(() => {
        console.log('mount')
        bookService.query().then(books => {
            setBooks(books)
        })
    }, [])
    const selectedBookId = false
    console.log('render')
    if (! books) return <div className="loading">Loading...</div>
    return (
        <section className="book-index">
            {
                ! selectedBookId &&
                    <React.Fragment>
                        <h1>Welcome to book index!</h1>
                        <BookFilter />
                        <BookList books={books} displayType={displayType} />
                    </React.Fragment>
            }
            {
                selectedBookId &&
                    < BookDetails />
            }
        </section>
    )
}