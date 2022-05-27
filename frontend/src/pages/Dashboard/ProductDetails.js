import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductDetails({ match }) {
  const id = match.params.id;

  const [orders, setorders] = useState();

  useEffect(() => {
    axios
      .get(`/api/shop/order`, { withCredentials: true })
      .then((e) => {
        setorders(e.data.filter(({ _id }) => _id === id)[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log(orders);
  return (
    <div className="row">
      <div className="container">
        <h3>Order Details</h3>
        <h6>{orders && orders._id && ` Order Number :  ${orders._id}`}</h6>

        <div className="row">
          {orders && (
            <>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow my-4 p-4">
                      <h5>Total Products Ordered : {orders.products.length}</h5>

                      <table className="w-100">
                        {orders.products.map((p) => {
                          return (
                            <tr>
                              <td>
                                <img
                                  src={p.image}
                                  style={{ width: '45px', margin: '5px' }}
                                  alt="img"
                                />
                              </td>
                              <td style={{ fontSize: '16px' }}>{p.name}</td>
                              <td>Rs. {p.price}</td>
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow my-4 p-4">
                      <h5>Personal Details</h5>
                      <div className="row details">
                        <div className="col-md-6">
                          <p>Name</p>
                          <h6> {orders.name} </h6>
                        </div>
                        <div className="col-md-6">
                          <p>Phone no</p>
                          <h6>{orders.phone}</h6>
                        </div>
                        <div className="col-12 mt-3">
                          <p>Address</p>
                          <h6>{orders.address}</h6>
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
                          <h6> {orders.payment.amount}</h6>
                        </div>
                        <div className="col-md-2">
                          <p>Paid</p>
                          <h6>{orders.payment.Paid ? 'Yes' : 'No'}</h6>
                        </div>
                        <div className="col-md-3">
                          <p>Booked On</p>
                          <h6>
                            {new Date(orders.orderOn).toLocaleDateString()}
                          </h6>
                        </div>
                        <div className="col-md-2">
                          <p>Payment Mode</p>
                          <h6>{orders.payment.mode}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
