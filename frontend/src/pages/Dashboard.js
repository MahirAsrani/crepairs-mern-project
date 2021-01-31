import axios from 'axios';
import React, { useContext } from 'react';
import { myContext } from '../Context';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function Dashboard() {
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
      <h1>hello loggedin user</h1>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

export default Dashboard;
