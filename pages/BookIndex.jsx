import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [displayType, setDisplayType] = useState('gallery')
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        console.log('mount / filterBy')
        bookService.query(filterBy).then(books => {
            console.log(books)
            setBooks(books)
        })
    }, [filterBy])

    function onSetFilterBy(newFilterBy) {
        setFilterBy(newFilterBy)
    }

    function onSelectBookId(bookId) {
        console.log(bookId)
        setSelectedBookId(bookId)
    }

    console.log('render')
    if (! books) return <div className="loading">Loading...</div>
    return (
        <main className="book-index">
            {
                ! selectedBookId &&
                    <React.Fragment>
                        <h1>Welcome to book index!</h1>
                        <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                        <BookList books={books} displayType={displayType} onSelectBookId={onSelectBookId}/>
                    </React.Fragment>
            }
            {
                selectedBookId &&
                    <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
            }
        </main>
    )
}