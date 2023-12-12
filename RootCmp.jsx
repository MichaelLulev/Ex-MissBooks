import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutGoal } from "./cmps/AboutGoal.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/HomePage.jsx"

const { Routes, Route } = ReactRouterDOM

export function App() {
    return (
        <div className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BookIndex />} />
                <Route path="/books/:bookId" element={<BookDetails />} />
                <Route path="/books/edit" element={<BookEdit />} />
                <Route path="/books/edit/:bookId" element={<BookEdit />} />
                <Route path="/about" element={<AboutUs />}>
                    <Route path="/about/team" element={<AboutTeam />} />
                    <Route path="/about/goal" element={<AboutGoal />} />
                </Route>
            </Routes>
            <UserMsg />
        </div>
    )
}