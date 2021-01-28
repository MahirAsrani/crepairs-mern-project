import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <Router>
      <nav className="header">
        <div className="nav container">
          <div className="navbar-header">
            <a className="brand" href="/">
              Crepairs
            </a>
          </div>
          <ul className="navlink">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/">Services</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

function About() {
  return <h2>about ka page</h2>;
}

export default App;
