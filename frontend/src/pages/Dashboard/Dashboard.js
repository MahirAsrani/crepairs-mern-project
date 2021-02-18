import axios from 'axios';
import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { toast } from 'react-toastify';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wash from '../Wash';
import './dash.css';
import { ManageCars } from './ManageCars';
import { ManageUsers } from './ManageUsers';
import CarList from './CarList';

function Dashboard() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const { user, auth, setAuth, setHeader } = useContext(myContext);
  setHeader(false);

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
            <Link to="/">
              <div className="logo ">CREPAIRS</div>
            </Link>

            <div className="dashnav">
              <ul>
                <NavLink to={`${url}`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-home"></i>
                    <span>Dashboard</span>
                  </li>
                </NavLink>

                <NavLink to={`${url}/bookings`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-calendar-alt"></i>
                    <span>Bookings</span>
                  </li>
                </NavLink>

                <NavLink to={`${url}/payments`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-rupee-sign"></i>
                    <span>Payments</span>
                  </li>
                </NavLink>

                <NavLink to={`${url}/cars`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-car "></i>
                    <span>Vehicles</span>
                  </li>
                </NavLink>

                <NavLink to={`${url}/users`} activeClassName="active">
                  <li>
                    <i class="fal fa-user-shield"></i>
                    <span>Users</span>
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>

          <header className="sidetop">
            <div className="content">
              <div className="userwithDrop">
                <div className="userbadge">
                  <div className="d-flex">
                    <div className="col myuser text-right px-2">
                      <h6> {user.name}</h6>
                      <p> {user.isAdmin ? 'Admin' : 'Customer'}</p>
                    </div>
                    <img
                      src={
                        (user.profileImg && user.profileImg) ||
                        require('../../assets/dp.png').default
                      }
                      alt="profile"
                      className="rounded-circle"
                      height="35px"
                      width="35px"
                    />
                  </div>
                </div>
                <div className="user-dropdown">
                  <ul className="drop-li">
                    <li>
                      <Link to="/user/profile">
                        <i className="far fa-user"></i>
                        <span> Profile</span>
                      </Link>
                    </li>
                    {user.isAdmin ? (
                      <li>
                        <Link to="/dashboard">
                          <i className="far fa-clipboard-list-check"></i>
                          <span> Dashboard</span>
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <i className="far fa-clipboard-list-check"></i>
                        <span> My Bookings </span>
                      </li>
                    )}
                    <li>
                      <i className="far fa-sign-out-alt"></i>
                      <span> Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          <div className="content-wrap">
            <Switch>
              <Route exact path={`${path}`} component={Dash} />
              <Route exact path={`${path}/cars`} component={ManageCars} />
              <Route exact path={`${path}/cars/audi`} component={CarList} />
              <Route exact path={`${path}/users`} component={ManageUsers} />
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
