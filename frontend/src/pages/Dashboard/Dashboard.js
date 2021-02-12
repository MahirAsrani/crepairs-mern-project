import axios from 'axios';
import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { toast } from 'react-toastify';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wash from '../Wash';
import './dash.css';
import AdminScreen from './AdminScreen';
import { ManageCars } from './ManageCars';
import { ManageUsers } from './ManageUsers';

function Dashboard() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const { user, auth, setAuth, setHeader } = useContext(myContext);
  setHeader(false);
  console.log(user);

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
                <li>
                  <i class="fal fa-sign-out-alt"></i>
                  <span>logout</span>
                </li>
              </ul>
            </div>
          </div>

          <header className="sidetop">
            <div className="content">
              <div className="userbadge">
                <img
                  src={require('../../assets/dp.png').default}
                  alt="profile"
                  className="rounded"
                  height="40px"
                />
                <h6> {user.name}</h6>
              </div>
            </div>
          </header>

          <div className="content-wrap">
            <Switch>
              <Route exact path={`${path}`} component={Dash} />
              <Route exact path={`${path}/admin`} component={AdminScreen} />
              <Route exact path={`${path}/admin/cars`} component={ManageCars} />
              <Route
                exact
                path={`${path}/admin/users`}
                component={ManageUsers}
              />
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
