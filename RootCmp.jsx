import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"

const { Routes, Route, Navigate } = ReactRouterDOM
const { useState, useEffect } = React

const PAGE_HOME = 'home'
const PAGE_BOOKS = 'book'
const PAGE_ABOUT = 'about'

export function App() {
    return (
        <div className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BookIndex />} />
                <Route path="/books/:bookId" element={<BookDetails />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </div>
    )
}