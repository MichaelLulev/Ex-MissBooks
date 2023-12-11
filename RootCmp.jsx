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
        <div className="app">
            <header className="app-header">
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <a href="#" onClick={() => setPage(PAGE_HOME)}>Home</a>
                    <a href="#" onClick={() => setPage(PAGE_BOOKS)}>Books</a>
                    <a href="#" onClick={() => setPage(PAGE_ABOUT)}>About</a>
                </nav>
            </header>
            {page === PAGE_HOME && <HomePage />}
            {page === PAGE_BOOKS && <BookIndex />}
            {page === PAGE_ABOUT && <AboutUs />}
        </div>
    )
}