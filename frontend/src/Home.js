import React, { useContext } from 'react';
import carImg from './assets/car.png';
import './App.css';
import wash from './assets/car-wash.svg';
import repair from './assets/car-repair.svg';
import mtnce from './assets/maintenance.svg';
import car2 from './assets/art.png';
import { Link } from 'react-router-dom';
import { myContext } from './Context';

function Home() {
  const { setHeader } = useContext(myContext);
  setHeader(true);

  return (
    <div className="">
      <section id="magic">
        <div className="container">
          <div className="row banner">
            <div className="col-md-6 banner_left">
              <h1>Hands that understand automobile very well..</h1>
              <p>
                We provide the joy of the best ride. We provide car related
                services to the users at their doorstep that includes car
                repair, car spa and car maintenance with the help of our well
                trained mechanics.
              </p>
              <button className="btn btn-action">Let's Repair</button>
            </div>
            <div className="col-md-6">
              <img src={carImg} alt="" className="carpic" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row my-5 homerow">
          <div className="col-12 text-center">
            <h3>How can we help</h3>
            <p>
              We provide fast and efficient car related services to our
              customers. It saves the time of our customers
              <br /> as they don’t have to visit the workshop but the customers
              can select services and <br />
              take an appointment then our trained mechanics will visit their
              place.
            </p>
            <div className="row my-3">
              <div className="col-md-4">
                <img src={car2} alt="" style={{ width: 350 }} />
              </div>
              <div className="col-md-8">
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="card">
                      <h5>Repair</h5>
                      <img src={repair} alt="" />
                      <p>
                        Carry out mechanical repairs like AC, Accessory
                        Installation , remove dents etc..
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <Link to="/services/car-spa" className="nodecor">
                      <div className="card mt-4">
                        <h5>Car Spa</h5>
                        <img src={wash} alt="" />
                        <p>
                          One stop solution for all your cleaning needs and
                          offer a variety of services.
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="col-md-4">
                    <div className="card">
                      <h5>Maintenance</h5>
                      <img src={mtnce} alt="" />
                      <p>
                        Provide comprehensive check-ups and periodic plans for
                        your car.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
