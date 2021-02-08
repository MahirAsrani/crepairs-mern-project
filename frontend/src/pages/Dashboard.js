import axios from 'axios';
import React, { useContext } from 'react';
import { myContext } from '../Context';
import { toast } from 'react-toastify';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wash from './Wash';

function Dashboard() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const { setAuth } = useContext(myContext);

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
  return (
    <div>
      <Switch>
        <Route path={`${path}/lol`} component={Wash} />
      </Switch>
      <h1>hello loggedin user</h1>
      <Link className="brand" to={`${url}/lol`}>
        Crepairs
      </Link>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

export default Dashboard;
