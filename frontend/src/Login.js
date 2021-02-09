import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './App.css';
import { myContext } from './Context';
import { toast } from 'react-toastify';

const Login = () => {
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
      <div className="login_left"></div>
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
            <p className="forgotpass">
              <Link to="/signin/reset">Forgot password</Link>
            </p>
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
};

export const ForgotPassword = () => {
  const [email, setemail] = useState('');
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const Submit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('/api/auth/forgot', { email }, { withCredentials: true })
      .then(() => {
        setLoading(false);
        toast.success('Successfully sent');
        // history.push('/login');
      })
      .catch((er) => toast.error('Theres no user with this email'));
  };

  return (
    <div>
      <div className="login_parent">
        <div className="login_left"></div>
        <div className="login_right">
          <div className="login_inside">
            <h3>Trouble Logging In?</h3>

            <form onSubmit={Submit} className="form">
              <label>Enter your email</label>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                className="textfield"
                type="email"
                placeholder="email@domain.com"
                required
              />

              <button type="submit">
                {isLoading ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                Send Reset Link <i className="gg-arrow-right"></i>
              </button>

              <p className="info">
                <Link to="/signin">Go back to login page</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewPassword = ({ match }) => {
  const [password, setPassword] = useState('');
  const [pass2, setPass2] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const token = match.params.resetToken;

  const Submit = (e) => {
    e.preventDefault();
    if (password === pass2) {
      setLoading(true);
      axios
        .post('/api/auth/reset', { password, token }, { withCredentials: true })
        .then(() => {
          setLoading(false);
          toast.success('Successfully Changed');
          history.push('/signin');
        })
        .catch((er) => toast.error(er.response.data));
    } else {
      toast.error('Password does not match with confirm password');
    }
  };

  return (
    <div>
      <div className="login_parent">
        <div className="login_left"></div>
        <div className="login_right">
          <div className="login_inside">
            <h3>New Password </h3>

            <form onSubmit={Submit} className="form">
              <label>Enter new password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="textfield"
                type="password"
                placeholder="************"
                required
              />
              <label>Enter confirm password </label>
              <input
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
                className="textfield"
                type="password"
                placeholder="************"
                required
              />

              <button type="submit">
                {isLoading ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                Change Password <i className="gg-arrow-right"></i>
              </button>

              <p className="info">
                <Link to="/signin">Go back to login page</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
