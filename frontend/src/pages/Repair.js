import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { myContext } from '../Context';
import './services.css';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import axios from 'axios';
import { keys } from './Razorpay/keys';

export const Repair = () => {
  const { user, setAuth, auth, setHeader } = useContext(myContext);
  const history = useHistory();
  setHeader(false);

  const [brands, setbrands] = useState(null);

  useEffect(() => {
    fetchbrands();
    if (user) {
      setForm((f) => ({
        ...f,
        fullName: user ? user.name : null,
        phoneNo: user ? user.phone : null,
        email: user ? user.email : null,

        houseNo: user ? user.address && user.address.houseNo : null,
        locality: user ? user.address && user.address.locality : null,
        city: user ? user.address && user.address.city : null,
        pincode: user ? user.address && user.address.pincode : null,
      }));
    }
  }, [user]);

  function fetchbrands() {
    axios
      .get('/api/cars/', { withCredentials: true })
      .then(({ data }) => {
        setbrands(data);
      })
      .catch((err) => console.log(err));
  }

  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  const [form, setForm] = useState({
    vehicleBrand: null,
    vehicleModel: 'Hatchback',
    vehicleImage: null,
    repair: [],
    serviceType: 'Car Spa',
    price: null,
    duration: null,
    date: null,
    time: null,
    fullName: user ? user.name : null,
    phoneNo: user ? user.phone : null,
    email: user ? user.email : null,

    houseNo: user ? user.address && user.address.houseNo : null,
    locality: user ? user.address && user.address.locality : null,
    city: user ? user.address && user.address.city : null,
    pincode: user ? user.address && user.address.pincode : null,
    country: 'INDIA',
    paymentMethod: 'onDelivery',

    razorpay: {
      razorpay_payment_id: null,
      razorpay_order_id: null,
      razorpay_signature: null,
      loading: true,
    },
  });

  useEffect(() => {
    if (brands) {
      const i = brands.filter((b) => {
        return b.brand === form.vehicleBrand;
      })[0];
      console.log(i);
    }
  }, [form.vehicleModel]);

  useEffect(() => {
    setAnimate(true);
  }, [step]);

  const handleContinue = () => {
    if (step === 3) {
      if (form.paymentMethod === 'Online') {
        // displayRazorpay();
      } else
        axios
          .post('/api/book/add', form, { withCredentials: true })
          .then((e) => {
            history.push('/success');
          })
          .catch((e) => console.log(e));
    }
    if (step !== 3) {
      switch (step) {
        case 1:
          if (
            form.vehicleBrand === null ||
            form.vehicleModel === null ||
            form.repair[0] === null
          )
            toast.error('Please fill all fields');
          else {
            setAnimate(false);
            setStep((e) => e + 1);
          }
          break;

        case 2:
          if (
            form.date === null ||
            form.time === null ||
            form.fullName === null ||
            form.email === null ||
            form.phoneNo === null ||
            form.houseNo === null ||
            form.locality === null ||
            form.pincode === null ||
            form.city === null ||
            form.country === null
          )
            toast.error('Please fill all fields');
          else {
            setAnimate(false);
            setStep((e) => e + 1);
          }
          break;

        default:
          break;
      }
    }
  };
  const handlePrevious = () => {
    if (step !== 1) {
      setAnimate(false);
      setStep((e) => e - 1);
    }
  };

  function selectRepair(type) {
    if (form.repair.includes(type)) {
      const newList = form.repair.filter((data) => data !== type);
      setForm((f) => ({ ...f, repair: [...newList] }));
    } else {
      setForm((f) => ({
        ...f,
        repair: [...f.repair, type],
      }));
    }
    console.log(form);
  }

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
    <div id="repair">
      <div className="service_nav">
        <div className="navbar-header">
          <Link className="brand" to="/">
            Crepairs
          </Link>
        </div>
        <div className="step_menu">
          <div className={step >= 1 ? 'step active' : 'step'}>
            <p>Plans</p>
            <div className="circle">
              {step > 1 ? <i className="gg-check"></i> : 1}
            </div>
          </div>
          <div className="line"></div>
          <div className={step >= 2 ? 'step active' : 'step'}>
            <p>Schedule</p>
            <div className="circle">
              {step > 2 ? <i className="gg-check"></i> : 2}
            </div>
          </div>
          <div className="line"></div>
          <div className={step >= 3 ? 'step active' : 'step '}>
            <p>Payment</p>
            <div className="circle">
              {step > 3 ? <i className="gg-check"></i> : 3}
            </div>
          </div>
        </div>

        <div className="auth">
          {user ? (
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
                      require('../assets/dp.png').default
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
          ) : (
            <Link className="login-btn" to="/signin">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <div className="container mheight">
        {step === 1 && (
          <CSSTransition in={animate} timeout={1000} classNames="animate">
            <div className="step1">
              <div className="row area-top">
                <div className="col-md-5 left_area">
                  <h2>Car Information</h2>

                  <label>Vehicle Brand</label>

                  <select
                    value={form.vehicleBrand}
                    onChange={(e) =>
                      setForm({ ...form, vehicleBrand: e.target.value })
                    }
                  >
                    <option value="" selected>
                      Choose Brand
                    </option>
                    {brands && brands.map((b) => <option>{b.brand}</option>)}
                  </select>

                  <label>Vehicle Model</label>

                  <select
                    value={form.vehicleModel}
                    onChange={(e) =>
                      setForm({ ...form, vehicleModel: e.target.value })
                    }
                  >
                    <option value="" selected>
                      Choose Model
                    </option>
                    {brands &&
                      form.vehicleBrand &&
                      brands
                        .filter((b) => {
                          return b.brand === form.vehicleBrand;
                        })
                        .map((m) =>
                          m.models.map((m) => <option>{m.Name}</option>)
                        )}
                  </select>
                </div>
                <div className="col-md-7 center">
                  {brands &&
                    brands
                      .filter((b) => {
                        return b.brand === form.vehicleBrand;
                      })
                      .map(({ models }) =>
                        models.map(
                          (m) =>
                            m.Name === form.vehicleModel && (
                              <img src={m.Image} alt="car" height="300px" />
                            )
                        )
                      )}
                </div>
              </div>

              <div className="row opt">
                <div className="col-2">
                  <div
                    className={
                      form.repair.includes('Wheels') ? 'card active' : 'card'
                    }
                    onClick={() => selectRepair('Wheels')}
                  >
                    <img
                      src={require('../assets/repair/wheel.png').default}
                      alt=""
                    />
                    <p>Wheels</p>
                  </div>
                </div>
                <div className="col-2">
                  <div
                    className={
                      form.repair.includes('Ac') ? 'card active' : 'card'
                    }
                    onClick={() => selectRepair('Ac')}
                  >
                    <img
                      src={require('../assets/repair/ac.png').default}
                      alt=""
                    />
                    <p>Ac Repair</p>
                  </div>
                </div>
                <div className="col-2">
                  <div
                    className={
                      form.repair.includes('Disc Brake')
                        ? 'card active'
                        : 'card'
                    }
                    onClick={() => selectRepair('Disc Brake')}
                  >
                    <img
                      src={require('../assets/repair/break.png').default}
                      alt=""
                    />
                    <p>Disc Brake</p>
                  </div>
                </div>
                <div className="col-2">
                  <div
                    className={
                      form.repair.includes('Batteries') ? 'card active' : 'card'
                    }
                    onClick={() => selectRepair('Batteries')}
                  >
                    <img
                      src={require('../assets/repair/batt.png').default}
                      alt=""
                    />
                    <p>Batteries</p>
                  </div>
                </div>
                <div className="col-2">
                  <div
                    className={
                      form.repair.includes('Custom') ? 'card active' : 'card'
                    }
                    onClick={() => selectRepair('Custom')}
                  >
                    <img
                      src={require('../assets/repair/custom.png').default}
                      alt=""
                    />
                    <p>Custom Service</p>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        )}

        {step === 2 && (
          <CSSTransition in={animate} timeout={1000} classNames="animate">
            <h1>
              {form.repair.map((d) => (
                <h3>{d}</h3>
              ))}
            </h1>
          </CSSTransition>
        )}

        <div className="sFoot">
          <p
            className={step === 1 ? 'prev disable' : 'prev'}
            onClick={() => handlePrevious()}
          >
            Previous
          </p>

          <button className="Continue" onClick={() => handleContinue()}>
            {step !== 3 ? 'Continue' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};
