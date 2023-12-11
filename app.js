import { App } from './RootCmp.jsx'

const Router = ReactRouterDOM.HashRouter

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(
    <Router>
        < App />
    </Router>
)