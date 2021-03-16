import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function BookDetails({ match }) {
  const id = match.params.id;

  const [bookings, setbookings] = useState();

  useEffect(() => {
    axios
      .get(`/api/book/find/${id}`, { withCredentials: true })
      .then(({ data }) => setbookings(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(bookings);

  return (
    <div className="row">
      <div className="container">
        <h3>Booking Details</h3>
        <div className="row">
          {bookings && (
            <>
              <div className="col-md-7">
                {bookings && (
                  <div className="row">
                    <div className="col-12">
                      <div className="card shadow my-4 p-4">
                        <h5>Personal Details</h5>
                        <div className="row details">
                          <div className="col-md-4">
                            <p>Name</p>
                            <h6> {bookings.user_id.name} </h6>
                          </div>
                          <div className="col-md-3">
                            <p>Phone no</p>
                            <h6>{bookings.user_id.phone}</h6>
                          </div>
                          <div className="col-md-5">
                            <p>Email</p>
                            <h6>{bookings.user_id.email}</h6>
                          </div>
                          <div className="col-12 mt-3">
                            <p>Address</p>
                            <h6>
                              {bookings.user_id.address.houseNo},
                              {bookings.user_id.address.locality},
                              {bookings.user_id.address.city},
                              {bookings.user_id.address.pincode},
                              {bookings.user_id.address.country}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow my-4 p-4">
                      <h5>Plan Details</h5>
                      <div className="row details">
                        <div className="col-md-4">
                          <p>Plan Type</p>
                          <h6> {bookings.service.serviceType}</h6>
                        </div>
                        <div className="col-md-4">
                          <p>Plan Name</p>
                          <h6> {bookings.service.plan}</h6>
                        </div>
                        <div className="col-md-4">
                          <p>Vehicle Type</p>
                          <h6>{bookings.vehicle.vehicleType}</h6>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p>Date</p>
                          <h6>
                            {new Date(bookings.scheduleDate).toDateString()},
                          </h6>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p>Time</p>
                          <h6>{bookings.scheduleTime}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow p-4">
                      <h5>Payment Details</h5>
                      <div className="row details">
                        <div className="col-md-2">
                          <p>Price</p>
                          <h6> {bookings.payment.amount}</h6>
                        </div>
                        <div className="col-md-2">
                          <p>Paid</p>
                          <h6>{bookings.payment.Paid ? 'Yes' : 'No'}</h6>
                        </div>
                        <div className="col-md-3">
                          <p>Booked On</p>
                          <h6>
                            {new Date(bookings.bookedOn).toLocaleDateString()}
                          </h6>
                        </div>
                        <div className="col-md-2">
                          <p>Payment Mode</p>
                          <h6>{bookings.payment.mode}</h6>
                        </div>
                        <div className="col-md-3">
                          <p>Status</p>
                          <h6>
                            {bookings.completed ? 'Completed' : 'Pending'}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sFoot mx-0">
                  <button className="Continue">Mark Booking Completed</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
