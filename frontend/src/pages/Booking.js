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
    <div className="col-md-6 shadow card p-5">
      <h3>Your Booking</h3>
      <div className="row">
        {data &&
          data.map((d) => (
            <>
              <div className="col-12 card p-3 my-2 shadow">
                <div className="row">
                  <div className="col-12 d-flex justify-content-between">
                    <h6>Service : {d.service.serviceType}</h6>
                    <h6>Car Type : {d.vehicle.vehicleType} </h6>
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <h6>Plan : {d.service.plan}</h6>
                    <h6>Price: {d.payment.amount}</h6>
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <p>
                      Pickup date : {new Date(d.scheduleDate).toDateString()}{' '}
                    </p>
                    <p> Scheduled Time :{d.scheduleTime} </p>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Booking;
