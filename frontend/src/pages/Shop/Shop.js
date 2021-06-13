import React from 'react';
import Category from './Comp/Cater';
import './Shop.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Shop() {
  useEffect(() => {
    axios
      .get('/api/shop/category')
      .then((d) => setcat(d.data))
      .catch((err) => console.log(err));

    axios
      .get('/api/shop/product/')
      .then((d) => setProd(d.data))
      .catch((err) => console.log(err));
  }, []);

  const [cat, setcat] = useState([]);
  const [prod, setProd] = useState([]);

  return (
    <div>
      <div className="banner">
        <div className="container">
          <div className="row py-5">
            <div className="col-8">
              <div className="bigBanner">
                <div className="d-flex justify-content-between w-100">
                  <h3>
                    20% off on first <br /> purchase
                  </h3>
                  <div className="CTA">Shop Now</div>
                </div>
              </div>
            </div>
            <div className="col-4 ad">
              <div className="row">
                <div className="col-12 small">
                  <h3>Alloys</h3>
                </div>
                <div className="col-12 small1">
                  <h3>Seat Covers</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Category cat={cat} />
        <div className="row">
          <div className="col-12 my-3">
            <h2> </h2>
          </div>

          {prod &&
            prod.map((p) => (
              <div className="col-md-3 product mb-5">
                <div className="card">
                  {/* <img src={p.image} alt="" />
                   */}
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${p.image})` }}
                  ></div>
                  <h5 className="center">{p.name}</h5>
                  <h6>Rs {p.price}</h6>

                  <div className="options">
                    <Link
                      to={`/shop/product/${p._id}`}
                      className="btn btn-block btn-primary"
                    >
                      <i class="far fa-eye"></i> View Product
                    </Link>
                    <Link to="" className="btn btn-block btn-primary">
                      <i class="fal fa-cart-plus"></i> Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
