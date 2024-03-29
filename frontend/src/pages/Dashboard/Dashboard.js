import axios from 'axios';
import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { toast } from 'react-toastify';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';
import './dash.css';
import { ManageCars } from './ManageCars';
import { ManageUsers } from './ManageUsers';
import CarList from './CarList';
import PaymentsList from './PaymentsList';
import { useState } from 'react';
import { useEffect } from 'react';
import { Dbooking } from './Dbooking';
import BookDetails from './BookDetails';
import ProductDetails from './ProductDetails';
import Items from './Items';

function Dashboard() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const { user, setAuth, setHeader } = useContext(myContext);
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
                <a href={`${url}`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-home"></i>
                    <span>Dashboard</span>
                  </li>
                </a>

                <a href={`${url}/bookings`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-calendar-alt"></i>
                    <span>Bookings</span>
                  </li>
                </a>

                <a href={`${url}/payments`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-rupee-sign"></i>
                    <span>Payments</span>
                  </li>
                </a>

                <a href={`${url}/cars`} exact activeClassName="active">
                  <li>
                    <i class="fal fa-car "></i>
                    <span>Vehicles</span>
                  </li>
                </a>

                <a href={`${url}/users`} activeClassName="active">
                  <li>
                    <i class="fal fa-user-shield"></i>
                    <span>Users</span>
                  </li>
                </a>

                <a href={`${url}/products`} activeClassName="active">
                  <li>
                    <i class="fal fa-shopping-cart"></i>
                    <span>Products</span>
                  </li>
                </a>
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
                        <Link to="/user/booking">
                          <i className="far fa-clipboard-list-check"></i>
                          <span> My Bookings </span>
                        </Link>
                      </li>
                    )}
                    <li onClick={() => logout()}>
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
              <Route exact path={`${path}/bookings`} component={Dbooking} />
              <Route
                exact
                path={`${path}/bookings/:id`}
                component={BookDetails}
              />
              <Route exact path={`${path}/payments`} component={PaymentsList} />
              <Route exact path={`${path}/cars`} component={ManageCars} />
              <Route exact path={`${path}/cars/:id`} component={CarList} />
              <Route exact path={`${path}/users`} component={ManageUsers} />
              <Route exact path={`${path}/products`} component={Items} />
              <Route
                exact
                path={`${path}/products/:id`}
                component={ProductDetails}
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
  const [booking, setbooking] = useState();
  const [orders, setorders] = useState();
  const [today, settoday] = useState();
  useEffect(() => {
    axios
      .get('/api/book', { withCredentials: true })
      .then((e) => setbooking(e.data))
      .catch((err) => console.log(err));
    axios
      .get('/api/shop/order', { withCredentials: true })
      .then((e) => setorders(e.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(orders);

  useEffect(() => {
    if (booking) {
      let today = booking.filter(
        (e) =>
          new Date(e.scheduleDate).toISOString().split('T')[0] ===
            new Date().toISOString().split('T')[0] && e.completed === false
      );
      settoday(today.length);
    }
  }, [booking]);

  return (
    <div className="dash-home container">
      <div className="row topnotify">
        <div className="col-md-3 mb-3">
          <div className="card c1">
            <div className="cicon">
              <i class="fal fa-bell-plus fa-2x"></i>
            </div>
            <div className="ctext">
              <span>{today && today}</span>
              <h6>Pickups Today</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card c2">
            <div className="cicon">
              <i class="fal fa-conveyor-belt fa-2x"></i>
            </div>
            <div className="ctext">
              <span>{booking && booking.length}</span>
              <h6>Total Bookings</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card c4">
            <div className="cicon">
              <i class="fal fa-calendar-check fa-2x"></i>
            </div>
            <div className="ctext">
              <span>
                {booking && booking.filter((b) => b.completed === false).length}
              </span>
              <h6>Pending</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card c3">
            <div className="cicon">
              <i class="fal fa-rupee-sign fa-2x"></i>
            </div>
            <div className="ctext">
              <span>
                {(booking &&
                  booking.length > 0 &&
                  booking
                    .map((i) => i.payment.Paid === true && i.payment.amount)
                    .reduce((prev, next) => prev + next)) ||
                  0}
              </span>
              <h6>Bookings Earnings</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card c4">
            <div className="cicon">
              <i class="fal fa-conveyor-belt fa-2x"></i>
            </div>
            <div className="ctext">
              <span>{orders && orders.length}</span>
              <h6>Total Shop Orders</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card c1">
            <div className="cicon">
              <i class="fal fa-rupee-sign fa-2x"></i>
            </div>
            <div className="ctext">
              <span>
                {(orders &&
                  orders.length > 0 &&
                  orders
                    .map((i) => i.payment.Paid === true && i.payment.amount)
                    .reduce((prev, next) => prev + next)) ||
                  0}
              </span>
              <h6>Orders Earnings</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
