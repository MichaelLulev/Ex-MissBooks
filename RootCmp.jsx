import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"

const { useState, useEffect } = React

const PAGE_HOME = 'home'
const PAGE_BOOKS = 'book'
const PAGE_ABOUT = 'about'

export function App() {
    const [page, setPage] = useState(PAGE_BOOKS)
    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss Books</h1>
            </header>
            <main className="container">
                {page === PAGE_HOME && <HomePage />}
                {page === PAGE_BOOKS && <BookIndex />}
                {page === PAGE_ABOUT && <AboutUs />}
            </main>
        </section>
    )
}