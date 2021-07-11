import React, { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../Context';
import './chkout.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { keys } from '../../Razorpay/keys';

function Checkout() {
  const { user, auth, setHeader, cart, setAuth, removecart } =
    useContext(myContext);
  const history = useHistory();
  setHeader(true);

  const [Loading, setLoading] = useState(false);

  if (cart.length === 0) {
    history.push('/shop');
  }

  const fireBuyAction = (e) => {
    e.preventDefault();
    if (!user) {
      const name = billing.name;
      const email = billing.email;
      const password = billing.password;
      axios
        .post('/api/auth/register', { name, email, password })
        .then(() => checkpayoption())
        .catch((e) =>
          alert('Account with this email already exists, please login')
        );
    } else checkpayoption();

    function checkpayoption() {
      setLoading(true);
      if (e.target.pay.value === 'Online') {
        displayRazorpay();
      } else {
        axios
          .post(
            '/api/shop/order/new',
            { ...billing, paymentMethod: 'onDelivery' },
            { withCredentials: true }
          )
          .then((e) => {
            history.push('/success');
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      }
    }
  };

  const [billing, setBilling] = useState({});

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function onlineCompleted(response) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      response;

    axios
      .post(
        '/api/shop/order/new',
        {
          ...billing,
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          paymentMethod: 'Online',
        },
        { withCredentials: true }
      )
      .then((e) => {
        history.push('/success');
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK Failed to load are you online ?');
      setLoading(false);
      return;
    }
    const data = await axios
      .post('/api/shop/order/razorpay', {
        products: cart.map((c) => c._id),
      })
      .then((d) => d.data)
      .finally(() => setLoading(false));

    const options = {
      key: keys.keyId,
      currency: 'INR',
      order_id: data.id,
      name: 'crepairs',
      description: 'Thank you for nothing.',
      handler: (response) => {
        onlineCompleted(response);
      },
      prefill: {
        name: billing.name,
        email: billing.email || user.email,
        contact: billing.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    setBilling((pre) => ({
      ...pre,
      cart,
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      address: user?.address?.houseNo,
      locality: user?.address?.locality,
      city: user?.address?.city,
      pincode: user?.address?.pincode,
      country: user?.address?.country,
    }));
    //eslint-disable-next-line
  }, [user]);

  function logout() {
    axios
      .get('/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setAuth(false);
      })
      .catch((er) => console.log(er));
  }

  return (
    <div id="chkout" className="container-fluid">
      <div className="row">
        <div className="col-8 px-5 py-3">
          {!auth ? (
            <>
              <h5>
                Have an account?{' '}
                <span
                  className="btn btn-primary btn-sm px-3 ml-3"
                  onClick={() => history.push('/signin')}
                >
                  Login
                </span>
              </h5>
              <hr />
              <span>
                Or Let's continue without an account, we will create one for you
              </span>
            </>
          ) : (
            <>
              <p className="p-0 mb-1" style={{ fontWeight: 300 }}>
                Not {user?.name}?{' '}
                <span onClick={logout} className="sigout-nt">
                  Sign out
                </span>
              </p>
              <h4>Billing Details</h4>
            </>
          )}

          <div className="my-3">
            <form onSubmit={fireBuyAction}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={billing.name}
                    onChange={(e) =>
                      setBilling((pre) => ({
                        ...pre,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Contact No</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="+91"
                    value={billing.phone}
                    onChange={(e) =>
                      setBilling((pre) => ({ ...pre, phone: e.target.value }))
                    }
                    required
                  />
                </div>
                {!user && (
                  <>
                    <div className="form-group col-md-6">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={billing.email}
                        onChange={(e) =>
                          setBilling((pre) => ({
                            ...pre,
                            email: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={billing.password}
                        onChange={(e) =>
                          setBilling((pre) => ({
                            ...pre,
                            password: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  value={billing.address}
                  onChange={(e) =>
                    setBilling((pre) => ({
                      ...pre,
                      address: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  value={billing.locality}
                  onChange={(e) =>
                    setBilling((pre) => ({
                      ...pre,
                      locality: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={billing.city}
                    onChange={(e) =>
                      setBilling((pre) => ({
                        ...pre,
                        city: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Pincode</label>
                  <input
                    type="number"
                    className="form-control"
                    value={billing.pincode}
                    onChange={(e) =>
                      setBilling((pre) => ({
                        ...pre,
                        pincode: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={billing.country}
                    onChange={(e) =>
                      setBilling((pre) => ({
                        ...pre,
                        country: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <hr />

              <h5>Select Payment mode</h5>
              <div className="d-flex">
                <div className="cusRadio mr-3">
                  <input
                    class="m-auto"
                    type="radio"
                    value="onDelivery"
                    name="pay"
                    id="COD"
                    required
                    defaultChecked
                  />
                  <label htmlFor="COD">Pay on delivery</label>
                </div>
                <div className="cusRadio mr-3">
                  <input
                    class="m-auto"
                    type="radio"
                    value="Online"
                    name="pay"
                    id="OP"
                  />
                  <label htmlFor="OP">Online Payment</label>
                </div>
              </div>

              <div className="sFoot m-0 ">
                <button
                  disabled={Loading}
                  type="submit"
                  className="Continue m-0 px-5"
                >
                  Checkout Now
                  {Loading && (
                    <div className="spinner-border text-light " role="status">
                      <span className="sr-only"></span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-4 px-5 pt-4 light-left d-flex flex-column">
          <h2 className="mb-4">Shopping Cart</h2>
          <div className="cart-chekout">
            {cart &&
              cart.map((c, idx) => (
                <div className="row my-3">
                  <div
                    className="col-3 img-cont"
                    style={{ backgroundImage: `url(${c.image})` }}
                  ></div>
                  <div className="col-9">
                    <h6 className="p_name">{c.name} </h6>
                    <div className="d-flex mr-3 mt-2 align-items-center justify-content-between">
                      <span style={{ color: '#0a0683' }}>Rs.{c.price} </span>
                      <span
                        style={{ fontSize: 12, cursor: 'pointer' }}
                        onClick={() => {
                          removecart(idx);
                        }}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <hr />

          <div className="pricebreak">
            <div className="d-flex justify-content-between">
              <h5 style={{ fontWeight: 400 }}>SubTotal</h5>
              <h5>Rs {cart.reduce((sum, cart) => sum + cart.price, 0)}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5 style={{ fontWeight: 400 }}>Shipping</h5>
              <h5>Free</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h2>Total</h2>
              <h2>Rs {cart.reduce((sum, cart) => sum + cart.price, 0)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
