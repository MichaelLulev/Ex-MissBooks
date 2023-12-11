import { BookPreview } from "./BookPreview.jsx"

const { Link } = ReactRouterDOM

export function BookList({ books, displayType, onSelectBookId}) {
    return (
        <section className="book-list">
            <h2>Book list</h2>
            <section className={`books-container ${displayType}`}>
            {
                books.map(book =>
                    <Link to={`/books/${book.id}`} key={book.id}>
                        <BookPreview
                            book={book}
                            onSelectBookId={onSelectBookId}
                        />
                    </Link>
                )
            }
            </section>
        </section>
    )
}