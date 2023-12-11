import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, displayType}) {
    return (
        <section className={`book-list ${displayType}`}>
            {
                books.map(book => {
                    return <BookPreview key={book.id} book={book} />
                })
            }
        </section>
    )
}