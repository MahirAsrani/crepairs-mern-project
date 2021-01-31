import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './App.css';
import { myContext } from './Context';
import { toast } from 'react-toastify';

function Login() {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const history = useHistory();
  const { setAuth } = useContext(myContext);

  function submitlogin(e) {
    e.preventDefault();
    if (email === '' || pass === '') {
      alert('info needed');
    } else {
      axios
        .post(
          '/api/auth/login',
          {
            email: email,
            password: pass,
          },
          { withCredentials: true }
        )
        .then(() => {
          setAuth(true);
          toast.success('Login Successful');
          history.push('/dashboard');
        })
        .catch((er) => toast.error('╳ Incorrect email or password'));
    }
  }

  return (
    <div className="login_parent">
      <div className="login_left">img</div>
      <div className="login_right">
        <div className="login_inside">
          <h3>Get Started</h3>

          <form onSubmit={submitlogin} className="form">
            <label>Email</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="textfield"
              type="email"
              placeholder="xyz@email.com"
              required
            />
            <label>Password</label>
            <input
              className="textfield"
              onChange={(e) => setpass(e.target.value)}
              value={pass}
              type="password"
              placeholder="******"
              required
            />
            <button type="submit">
              Sign in <i className="gg-arrow-right"></i>
            </button>
          </form>

          <p className="info">
            Don't have an account, <Link to="/">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
