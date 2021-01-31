import React from 'react';
import carImg from './assets/car.png';
import './App.css';
import wash from './assets/car-wash.svg';
import repair from './assets/car-repair.svg';
import mtnce from './assets/maintenance.svg';
import car2 from './assets/art.png';

function Home() {
  return (
    <div className="">
      <section id="magic">
        <div className="container">
          <div className="row banner">
            <div className="col-md-6 banner_left">
              <h1>Crepairs provide doorstep mechanic services in india</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pharetra magna ac placerat vestibulum lectus mauris ultrices.
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
        <div className="row my-5">
          <div className="col-12 text-center">
            <h3>How can we help</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              <br /> sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
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
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit?
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card mt-4">
                      <h5>Car Spa</h5>
                      <img src={wash} alt="" />
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit?
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card">
                      <h5>Maintenance</h5>
                      <img src={mtnce} alt="" />
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit?
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
