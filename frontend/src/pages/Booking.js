import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { myContext } from '../Context';
import './profile.css';

function Booking() {
  const { user, auth, setHeader, refresh } = useContext(myContext);
  setHeader(true);
  const [data, setdata] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/book/${user._id}`, { withCredentials: true })
      .then((d) => setdata(d.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="col-12 col-md-8 shadow profilecard  card p-5">
      <h3>Your Bookings</h3>
      <div className="row">
        {data &&
          data.map((d) => (
            <>
              <div className="col-12 col-lg-6 my-3">
                <div className="row booking_card p-2">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <span className="title">Service</span>
                        <p>{d.service.serviceType}</p>
                      </div>
                      <div className="col-6">
                        <span className="title">Plan</span>
                        <p>{d.service.plan}</p>
                      </div>
                      <div className="col-12 my-1">
                        <span className="title">Scheduled Date & Time</span>
                        <div className="d-flex irow">
                          <i class="far fa-calendar-alt"></i>
                          <p>{new Date(d.scheduleDate).toDateString()}</p>
                          <i class="fal fa-clock"></i>
                          <p>{d.scheduleTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="light" />
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <p className="price"> Rs. {d.payment.amount}</p>
                    <div className="btn buttonView">View</div>
                  </div>
                </div>
              </div>
            </>
          ))}
        {/*  MINE END*/}
      </div>
    </div>
  );
}

export default Booking;
