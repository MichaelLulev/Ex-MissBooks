

export function BookPreview({ book, onSelectBookId }) {
    const thumbnail = book.thumbnail.split('/').slice(-1)
    return (
        <article className="book-preview">
            <img src={`assets/img/${thumbnail}`} alt={`${book.title} thumbnail`} />
            <h3>{book.title}</h3>
        </article>
    )
}