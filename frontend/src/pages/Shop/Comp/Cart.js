import React, { useContext, useState } from 'react';
import './Cart.css';
import { myContext } from '../../../Context';
import { useHistory } from 'react-router-dom';

function Cart() {
  const { cart, removecart } = useContext(myContext);
  const [open, setopen] = useState(false);
  const history = useHistory();

  function addCost(cart) {
    let old = 0;
    cart.forEach((p) => (old += p.price));
    return old;
  }

  if (!open) {
    return (
      <div id="cart" onClick={() => cart.length > 0 && setopen(true)}>
        <i class="ri-shopping-cart-2-line ri-2x"></i>
        <span className="noti">{cart ? cart.length : '0'}</span>
      </div>
    );
  } else {
    return (
      <div id="open_cart">
        <div className="p_list">
          {cart.map((c, idx) => (
            <div className="row my-3">
              <div className="col-4">
                <img src={c.image} className="p_img" alt="" />
              </div>
              <div className="col-8">
                <h6 className="p_name">{c.name} </h6>
                <div className="d-flex mr-3 mt-2 align-items-center justify-content-around">
                  <span>Rs.{c.price} </span>
                  <span
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
        <div className="d-flex">
          <div className="col-10 p-0 m-0">
            <button
              className="p_btn"
              onClick={() => history.push('/shop/checkout')}
            >
              Checkout
              <span style={{ marginLeft: 80 }}>
                Rs {` ` + cart.length > 0 && addCost(cart)}
              </span>
            </button>
          </div>
          <div
            onClick={() => setopen(false)}
            className="col-2 p-0 m-0 align-items-center d-flex justify-content-center close-btn"
          >
            <i class="ri-close-fill ri-2x"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
