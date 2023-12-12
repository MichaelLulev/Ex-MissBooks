import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"
import { booksData } from "../data/books.js"

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
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
        publishedDate: new Date().getFullYear(),
    }
    return newBook
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