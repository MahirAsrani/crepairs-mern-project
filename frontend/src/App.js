import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login, { ForgotPassword, NewPassword } from './Login';
import Dashboard from './pages/Dashboard';
import { myContext } from './Context';
import { useContext } from 'react';
import Wash from './pages/Wash';
import ScrollToTop from './Scrolltotop';

function App(props) {
  const { user, auth, isheader } = useContext(myContext);
  console.log(user, auth);

  return (
    <Router>
      <ScrollToTop>
        {isheader ? <Header user={user} /> : null}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services/car-spa" component={Wash} />

          {auth ? (
            <>
              <Route path="/dashboard" component={Dashboard} />
            </>
          ) : (
            <>
              <Route exact path="/signin" component={Login} />
              <Route exact path="/signin/reset" component={ForgotPassword} />
              <Route
                exact
                path="/signin/createnew/:resetToken"
                component={NewPassword}
              />
            </>
          )}
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

const Header = ({ user }) => {
  return (
    <nav className="header">
      <div className="nav container">
        <div className="navbar-header">
          <Link className="brand" to="/">
            Crepairs
          </Link>
        </div>
        <div className="menu">
          <ul className="navlink mb-0">
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
  );
};

function About() {
  return <h2>about ka page</h2>;
}

export default App;
