const { Link, Outlet } = ReactRouterDOM

export function AboutUs(props) {
    return (
        <main className="about-us">
            <h2>About</h2>
            <Link to="/about/team">
                <button className="about-team-button">About team</button>
            </Link>
            <Link to="/about/goal">
                <button className="about-goal-button">About goal</button>
            </Link>
            <Outlet />
        </main>
    )
}