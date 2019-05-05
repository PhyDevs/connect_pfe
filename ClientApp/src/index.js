import React from "react"
import ReactDOM from "react-dom"
import { Router, Link } from "@reach/router"

const Home = () => <h1>Home ddPage</h1>
const About = () => <h1>About Page</h1>

const App = () => (
    <React.Fragment>
        <h2>Header</h2>
        <Link to="/">Home </Link>
        <Link to="/about">About</Link>

        <Router>
            <Home path="/" />
            <About path="/about" />
        </Router>
    </React.Fragment>
)

ReactDOM.render(<App />, document.getElementById("app"))
