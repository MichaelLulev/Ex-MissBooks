import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, displayType, onSelectBookId}) {
    return (
        <section className="book-list">
            <h2>Book list</h2>
            <section className={`books-container ${displayType}`}>
            {
                books.map(book => {
                    return <BookPreview key={book.id} book={book} onSelectBookId={onSelectBookId}/>
                })
            }
            </section>
        </section>
    )
}