import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../Context';
import './services.css';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';

function Wash() {
  const { user, auth, setHeader } = useContext(myContext);
  setHeader(false);

  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  const [form, setForm] = useState({
    vehicleBrand: null,
    vehicleType: 'Hatchback',
    plan: null,
    duration: null,
    date: null,
    time: null,
    fullName: null,
    phoneNo: null,
    email: null,
    houseNo: null,
    street: null,
    city: null,
    pincode: null,
    country: 'INDIA',
    paymentMethod: 'onDelivery',
  });

  const plans = [
    {
      Name: 'Express',
      Price: 200,
      features: [
        { name: 'Exterior' },
        { name: 'Basic Interior' },
        { name: 'Antirust Treatment' },
      ],
      Duration: '1 hr',
    },

    {
      Name: 'Express 2',
      Price: 400,
      features: [
        { name: 'Exterior' },
        { name: 'Full Interior' },
        { name: 'Antirust Treatment' },
        { name: 'Polish' },
      ],
      Duration: '1.5 hr',
    },

    {
      Name: 'Premium',
      Price: 1400,
      features: [
        { name: 'Exterior' },
        { name: 'Full Interior' },
        { name: 'Antirust Treatment' },
        { name: 'Ceramic Coating' },
        { name: 'Tyre Polishing' },
      ],
      Duration: '2.5 hr',
    },
  ];

  useEffect(() => {
    setAnimate(true);
  }, [step]);

  const handleContinue = () => {
    if (step !== 3) {
      setAnimate(false);
      setStep((e) => e + 1);
    }
  };
  const handlePrevious = () => {
    if (step !== 1) {
      setAnimate(false);
      setStep((e) => e - 1);
    }
  };

  const handlePlanSelect = (name, dur) => {
    setForm({ ...form, plan: name, duration: dur });
  };

  return (
    <div>
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
            <Link className="login-btn" to="/dashboard">
              {user.name}
            </Link>
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
                  <select>
                    <option>Audi</option>
                    <option>Bmw</option>
                    <option>Kia</option>
                  </select>

                  <label>Vehicle Type</label>

                  <select
                    value={form.vehicleType}
                    onChange={(e) =>
                      setForm({ ...form, vehicleType: e.target.value })
                    }
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div className="col-md-7 center">
                  <img
                    src={
                      require(`../assets/CarType/${form.vehicleType}.jpg`)
                        .default
                    }
                    alt="car"
                    height="250px"
                  />
                </div>
              </div>

              <div className="row plansGrid">
                {plans.map((data) => (
                  <div className="col-md-3">
                    <div
                      className={
                        data.Name === form.plan ? 'plans active' : 'plans'
                      }
                      onClick={() => handlePlanSelect(data.Name, data.Duration)}
                    >
                      <div className="price">
                        <h5>{data.Name}</h5>
                        <p>Rs. {data.Price} </p>
                      </div>
                      <div className="features">
                        {data.features.map((d) => (
                          <div className="col-12">
                            <div className="d-flex">
                              <i class="gg-check"></i>
                              <p>{d.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="time">
                        <div className="wtICON">
                          <i class="gg-alarm"></i>
                          <p>Duration</p>
                        </div>
                        <p>{data.Duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CSSTransition>
        )}
        {step === 2 && (
          <CSSTransition in={animate} timeout={1000} classNames="animate">
            <div className="step2">
              <div className="row">
                <div className="col-md-8 align-self-center">
                  <h4 style={{ fontWeight: 600 }}> Appointment </h4>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label> Date </label>
                      <input
                        type="date"
                        className="form-control appt"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label> Time </label>
                      <input
                        type="time"
                        className="form-control appt"
                        value={form.time}
                        onChange={(e) =>
                          setForm({ ...form, time: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 center">
                  <img
                    src={
                      require(`../assets/CarType/${form.vehicleType}.jpg`)
                        .default
                    }
                    alt="car"
                    height="150px"
                  />
                </div>
              </div>

              <div className="row p-3">
                <div className="col-8 UserInfo px-5 py-4">
                  <h5 className="mb-3">User Information</h5>
                  <div className="row">
                    <div className="col-md-4">
                      Full Name
                      <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="form-control"
                        maxLength="20"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      Phone Number
                      <input
                        type="text"
                        placeholder="+91"
                        maxLength="15"
                        className="form-control"
                        value={form.phoneNo}
                        onChange={(e) =>
                          setForm({ ...form, phoneNo: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-5">
                      Email
                      <input
                        type="email"
                        placeholder="ex@domain.com"
                        className="form-control"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12">Address</div>
                    <div className="col-md-8 mb-3">
                      <input
                        type="text"
                        placeholder="Appartment Name / Floor No / House No "
                        maxLength="100"
                        className="form-control"
                        value={form.houseNo}
                        onChange={(e) =>
                          setForm({ ...form, houseNo: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        placeholder="Street"
                        maxLength="50"
                        className="form-control"
                        value={form.street}
                        onChange={(e) =>
                          setForm({ ...form, street: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        placeholder="City"
                        maxLength="50"
                        className="form-control"
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <input
                        type="text"
                        placeholder="Pincode"
                        className="form-control"
                        value={form.pincode}
                        onChange={(e) =>
                          setForm({ ...form, pincode: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <input
                        type="text"
                        value="India"
                        maxLength="30"
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 PlanDet plansGrid p-4">
                  {plans.map((p) =>
                    p.Name === form.plan ? (
                      <>
                        <div className="plans noplans">
                          <div className="price">
                            <h5>{p.Name}</h5>
                            <p>Rs. {p.Price} </p>
                          </div>
                          <div className="features">
                            {p.features.map((d) => (
                              <div className="col-6">
                                <div className="d-flex">
                                  <i class="gg-check"></i>
                                  <p>{d.name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="time">
                            <div className="wtICON">
                              <i class="gg-alarm"></i>
                              <p>Duration</p>
                            </div>
                            <p>{p.Duration}</p>
                          </div>
                        </div>
                      </>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </CSSTransition>
        )}
        {step === 3 && (
          <CSSTransition in={animate} timeout={1000} classNames="animate">
            <div className="step3">
              <div className="row">
                <div className="col-12 my-3">
                  <h4 style={{ fontWeight: 600 }}>Summary</h4>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-12">
                      <div className="card shadow p-4">
                        <h5>Personal Details</h5>
                        <div className="row details">
                          <div className="col-md-3">
                            <p>Name</p>
                            <h6> {form.fullName} </h6>
                          </div>
                          <div className="col-md-3">
                            <p>Phone no</p>
                            <h6>{form.phoneNo}</h6>
                          </div>
                          <div className="col-md-6">
                            <p>Email</p>
                            <h6>{form.email}</h6>
                          </div>
                          <div className="col-12 mt-3">
                            <p>Address</p>
                            <h6>
                              {form.houseNo}, {form.street}, {form.city},{' '}
                              {form.pincode}, {form.country}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="card shadow p-4 mt-3">
                        <h5>Plan & Booking Details</h5>
                        <div className="row details">
                          <div className="col-4 mt-2">
                            <p>Plans</p>
                            <h6>{form.plan}</h6>
                          </div>
                          <div className="col-4 mt-2">
                            <p>Car Brand</p>
                            <h6>{form.vehicleBrand}</h6>
                          </div>
                          <div className="col-4 mt-2">
                            <p>Car Type</p>
                            <h6>{form.vehicleType}</h6>
                          </div>

                          <div className="col-4 mt-2">
                            <p>Date</p>
                            <h6>{form.date}</h6>
                          </div>
                          <div className="col-4 mt-2">
                            <p>Time</p>
                            <h6>{form.time}</h6>
                          </div>
                          <div className="col-4 mt-2">
                            <p>Duration</p>
                            <h6>{form.duration}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-12">
                      <div className="card shadow p-4">
                        <h4>Price Breakdown</h4>
                        <div className="px-3 mt-2">
                          <div className="d-flex justify-content-between">
                            <p>price</p>
                            <h6>Rs 400</h6>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>Delivery charge</p>
                            <h6>Free</h6>
                          </div>
                          <div className="d-flex justify-content-between final">
                            <p>Total</p>
                            <h5>Rs 400</h5>
                          </div>
                        </div>
                        <hr />
                        <h5>Payment Method</h5>

                        <div className="px-3">
                          <div className="cusRadio">
                            <input
                              class="m-auto"
                              type="radio"
                              value="onDelivery"
                              name="pay"
                              id="COD"
                              onClick={(e) =>
                                setForm({
                                  ...form,
                                  paymentMethod: e.target.value,
                                })
                              }
                              checked={
                                form.paymentMethod === 'onDelivery'
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="COD">Pay on delivery</label>
                          </div>
                          <div className="cusRadio">
                            <input
                              class="m-auto"
                              type="radio"
                              value="Online"
                              name="pay"
                              id="OP"
                              onClick={(e) =>
                                setForm({
                                  ...form,
                                  paymentMethod: e.target.value,
                                })
                              }
                              checked={
                                form.paymentMethod === 'Online' ? true : false
                              }
                            />
                            <label htmlFor="OP">Online Payment</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
}

export default Wash;
