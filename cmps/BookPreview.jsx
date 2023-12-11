

export function BookPreview({ book }) {
    const thumbnail = book.thumbnail.split('/').slice(-1)
    console.log(thumbnail)
    return (
        <article className="book-preview">
            <img src={`../assets/img/${thumbnail}`} alt={`${book.title} thumbnail`} />
            <h3>{book.title}</h3>
        </article>
    )
}