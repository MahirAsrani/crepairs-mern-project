import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import { myContext } from './Context';
import { useContext } from 'react';

function App() {
  const { user, auth } = useContext(myContext);
  console.log(user, auth);

  return (
    <Router>
      <nav className="header">
        <div className="nav container">
          <div className="navbar-header">
            <a className="brand" href="/">
              Crepairs
            </a>
          </div>
          <div className="menu">
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
            {user ? (
              <Link className="login-btn" to="/dashboard">
                {user.name}
              </Link>
            ) : (
              <Link className="login-btn" to="/signin">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />

        {auth ? (
          <>
            <Route path="/dashboard" component={Dashboard} />
          </>
        ) : (
          <>
            <Route path="/signin" component={Login} />
          </>
        )}
      </Switch>
    </Router>
  );
}

function About() {
  return <h2>about ka page</h2>;
}

export default App;
