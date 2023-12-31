import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"
import { booksData } from "../data/books.js"

export const bookService = {
    query,
    get,
    getNextBook,
    getPrevBook,
    remove,
    save,
    getEmptyBook,
    getEmptyReview,
    addReview,
    deleteReview,
    getDefaultFilter,
}

const BOOKS_KEY = 'missBooksData'

function query(filterBy) {
    const prmBookData = storageService.query(BOOKS_KEY).then(books => {
        if (books.length === 0) books = _populateBooks()
        if (filterBy) {
            books = books.filter(book => RegExp(filterBy.title, 'i').test(book.title))
            books = books.filter(book => book.publishedDate >= filterBy.publishedDateFrom)
            books = books.filter(book => book.publishedDate <= filterBy.publishedDateTo)
        }
        return books
    })
    return prmBookData
}

function get(bookId) {
    const prmBook = storageService.get(BOOKS_KEY, bookId)
    return prmBook
}

function getNextBook(bookId) {
    return query().then(books => {
        const bookIdx = books.findIndex(book => book.id === bookId)
        const nextBookIdx = bookIdx === books.length - 1 ? 0 : bookIdx + 1
        return books[nextBookIdx]
    })
}

function getPrevBook(bookId) {
    return query().then(books => {
        const bookIdx = books.findIndex(book => book.id === bookId)
        const prevBookIdx = bookIdx === 0 ? books.length - 1 : bookIdx - 1
        return books[prevBookIdx]
    })
}

function remove(bookId) {
    const prmBookData = storageService.remove(BOOKS_KEY, bookId)
    return prmBookData
}

function save(book) {
    if (book.id) var prmBookData = storageService.put(BOOKS_KEY, book)
    else var prmBookData = storageService.post(BOOKS_KEY, book)
    return prmBookData
}

function getEmptyBook() {
    const newBook = {
        title: '',
        thumbnail: '',
        publishedDate: new Date().getFullYear(),
    }
    return newBook
}

function getEmptyReview() {
    const newReview = {
        name: '',
        rating: '',
        readAt: '',
    }
    return newReview
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if (! book.reviews) book.reviews = []
        review.id = utilService.makeId()
        book.reviews.push(review)
        return save(book).then(books => books.find(book => book.id === bookId))
    })
}

function deleteReview(bookId, reviewId) {
    return get(bookId).then(book => {
        if (book.reviews) {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
            if (0 <= reviewIdx) book.reviews.splice(reviewIdx, 1)
        }
        return book
    })
}

function getDefaultFilter() {
    const filter = {
        title: '',
        publishedDateFrom: -9999,
        publishedDateTo: +9999,
    }
    return filter
}

function _populateBooks() {
    utilService.saveToStorage(BOOKS_KEY, booksData) // Bypass storageService to save all books at once as demo data
    return booksData
}