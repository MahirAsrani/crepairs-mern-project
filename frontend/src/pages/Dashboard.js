import axios from 'axios';
import React, { useContext } from 'react';
import { myContext } from '../Context';
import { toast } from 'react-toastify';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wash from './Wash';
import './dash.css';
import AdminScreen from './AdminScreen';

function Dashboard() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const { user, auth, setAuth, setHeader } = useContext(myContext);
  setHeader(false);
  console.log(user);

  function logout() {
    axios
      .get('/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setAuth(false);
        toast.info('Success logout');
        history.push('/');
      })
      .catch((er) => console.log(er));
  }
  if (user) {
    return (
      <div>
        <div className="d-flex">
          <div className="sidebar dark">
            <div className="logo">CREPAIRS</div>
            <div className="dashnav">
              <ul>
                <NavLink to={`${url}`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-home"></i>
                    <span>Dashboard</span>
                  </li>
                </NavLink>

                <li>
                  <i class="fal fa-calendar-alt"></i>
                  <span>Bookings</span>
                </li>
                <li>
                  <i class="fal fa-cog"></i>
                  <span>Settings</span>
                </li>
                {user.isAdmin && (
                  <NavLink to={`${url}/admin`} activeClassName="active">
                    <li>
                      <i class="fal fa-user-shield"></i>
                      <span>Admin</span>
                    </li>
                  </NavLink>
                )}
                <li onClick={() => logout()}>
                  <i class="fal fa-sign-out-alt"></i>
                  <span>logout</span>
                </li>
              </ul>
            </div>
          </div>

          <header className="sidetop">
            <div className="content">
              <h5> Hello, {user.name}</h5>
            </div>
          </header>

          <div className="content-wrap">
            <Switch>
              <Route exact path={`${path}`} component={Dash} />
              <Route path={`${path}/admin`} component={AdminScreen} />
            </Switch>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="col-12"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          class="spinner-border text-danger h3"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        ></div>
        <h4>Loading...</h4>
      </div>
    );
  }
}

const Dash = () => {
  return <h3>Dash home</h3>;
};

export default Dashboard;
