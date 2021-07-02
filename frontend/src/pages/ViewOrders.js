import React from 'react';
import './profile.css';

function ViewOrders() {
  return (
    <div className="col-12 col-md-8 shadow profilecard  card p-5">
      <h3>Your Orders</h3>
      <div className="row">
        {[0, 0, 0].map((d) => (
          <>
            <div className="col-12 col-lg-6 my-3">
              <div className="row booking_card p-2">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <span className="title">Service</span>
                      <p>xyz</p>
                    </div>
                    <div className="col-12 my-1">
                      <span className="title">Scheduled Date & Time</span>
                      <div className="d-flex irow">
                        <i class="far fa-calendar-alt"></i>
                        <i class="fal fa-clock"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="light" />
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <p className="price"></p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ViewOrders;
