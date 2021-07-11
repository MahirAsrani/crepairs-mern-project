import React, { useContext } from 'react';
import Category from './Comp/Cater';
import Cart from './Comp/Cart';
import './Shop.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../../Context';

function Shop() {
  const { addcart } = useContext(myContext);

  const [cat, setcat] = useState([]);
  const [prod, setProd] = useState([]);
  const [selected, setselect] = useState();

  useEffect(() => {
    console.log('called');
    axios
      .get('/api/shop/category')
      .then((d) => setcat(d.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!selected) {
      axios
        .get('/api/shop/product/')
        .then((d) => setProd(d.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/shop/category/${selected}`)
        .then((s) => setProd(s.data.products))
        .catch((err) => console.log(err));
    }
  }, [selected]);

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
        <Category cat={cat} selected={selected} setselect={setselect} />
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
                    <div
                      onClick={() => addcart(p)}
                      className="btn btn-block btn-primary"
                    >
                      <i class="fal fa-cart-plus"></i> Add to cart
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Cart />
    </div>
  );
}

export default Shop;
