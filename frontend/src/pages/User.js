import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import Booking, { ViewBooking } from './Booking';
import Profile, { Cpassword } from './Profile';
import ViewOrders from './ViewOrders';
import './profile.css';

function User() {
  let { path } = useRouteMatch();

  return (
    <div className="bg-light">
      <div className="backgrad"></div>
      <div className="container">
        <div className="row py-5">
          <div className="col-md-3 profile_menu">
            <ul>
              <NavLink activeClassName="active" to={`${path}/profile`}>
                <li>Profile</li>
              </NavLink>
              <NavLink activeClassName="active" to={`${path}/booking`}>
                <li>Bookings</li>
              </NavLink>
              <NavLink activeClassName="active" to={`${path}/orders`}>
                <li>Orders</li>
              </NavLink>
              <NavLink activeClassName="active" to={`${path}/changepassword`}>
                <li>Password</li>
              </NavLink>
            </ul>
          </div>

          {/* Comp switch */}
          <Switch>
            <Route exact path={`${path}/profile`} component={Profile} />
            <Route exact path={`${path}/booking`} component={Booking} />
            <Route exact path={`${path}/booking/:id`} component={ViewBooking} />
            <Route exact path={`${path}/orders`} component={ViewOrders} />
            <Route exact path={`${path}/orders/:id`} />
            <Route
              exact
              path={`${path}/changepassword`}
              component={Cpassword}
            />
          </Switch>
          {/* Comp switch */}
        </div>
      </div>
    </div>
  );
}

export default User;
