import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../Context';
import './services.css';
import { CSSTransition } from 'react-transition-group';

function Wash() {
  const { user, auth, setHeader } = useContext(myContext);
  setHeader(false);

  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  const [form, setForm] = useState({
    vehicleBrand: null,
    vehicleType: 'Hatchback', //
    plan: null,
  });

  const plans = [
    {
      Name: 'Express',
      Price: 200,
      features: [{ name: 'abc' }, { name: '2' }, { name: '3' }, { name: '4' }],
      Duration: '1 hr',
    },

    {
      Name: 'Express 2',
      Price: 400,
      features: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }],
      Duration: '1 hr',
    },

    {
      Name: 'Express 3',
      Price: 400,
      features: [{ name: '1ss' }, { name: '2' }, { name: '3' }, { name: '4' }],
      Duration: '1 hr',
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

  const handlePlanSelect = (name) => {
    setForm({ ...form, plan: name });
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
                      onClick={() => handlePlanSelect(data.Name)}
                    >
                      <div className="price">
                        <h5>{data.Name}</h5>
                        <p>Rs. {data.Price} </p>
                      </div>
                      <div className="features">
                        {data.features.map((d) => (
                          <div className="col-6">
                            <i class="gg-check"></i>
                            <p>{d.name}</p>
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
              <h1>step 2 bitch</h1>
            </div>
          </CSSTransition>
        )}
        {step === 3 && (
          <CSSTransition in={animate} timeout={1000} classNames="animate">
            <div className="step3">
              <h1>step 3 bitchesss</h1>
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
            {step !== 3 ? 'Continue' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wash;
