import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import { useContext } from 'react';
import { myContext } from '../Context';

function ViewOrders() {
  const [order, setorder] = useState();
  const { user } = useContext(myContext);

  useEffect(() => {
    user &&
      axios
        .get('/api/shop/order/' + user._id, { withCredentials: true })
        .then((d) => setorder(d.data))
        .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="col-12 col-md-8 shadow profilecard  card p-5">
      <h3>Your Orders</h3>
      <div className="row">
        {order &&
          order.map((d) => (
            <>
              <div className="col-12 col-lg-6 my-3">
                <div className="row booking_card p-2">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <span className="title">Order ID : {d._id}</span>
                        <p>No of Products : {d.products.length}</p>
                      </div>
                      <div className="col-12 my-1">
                        <span className="title">Order Date </span>
                        <div className="d-flex irow">
                          <i class="far fa-calendar-alt mr-2"></i>
                          {new Date(d.orderOn).toDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="light" />
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <p className="light"> Pay : {d.payment.mode}</p>
                    <p className="price">Rs. {d.payment.amount}</p>
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
