import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function AdminScreen() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h3>Welcome, Admin</h3>
      <div className="row my-4">
        <div className="col-3">
          <Link to={path + '/cars'}>
            <div className="card text-center py-4">
              <i class="fal fa-car fa-4x"></i>
              <h5>Cars Management</h5>
            </div>
          </Link>
        </div>
        <div className="col-3">
          <Link to={path + '/users'}>
            <div className="card text-center py-4">
              <i class="fal fa-user fa-4x"></i>
              <h5>Manage Users</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminScreen;
