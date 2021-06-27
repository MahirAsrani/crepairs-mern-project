import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Cart from './Comp/Cart';
import { myContext } from '../../Context';

function Product({ match }) {
  const { addcart } = useContext(myContext);

  const id = match.params.id;
  const [product, setproduct] = useState();
  useEffect(() => {
    axios
      .get('/api/shop/product/' + id)
      .then((d) => setproduct(d.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h1>laoding...</h1>;
  if (product)
    return (
      <div className="par">
        <div className="container parentcontainer py-5">
          <div className="prod">
            <div className="col-6  justify-content-center d-flex flex-column">
              <h1>{product.name}</h1>
              <div className="row my-3">
                <div className="col-12">{product.description}</div>
              </div>
              <div className="row">
                <div className="p-4">
                  <h6>Price</h6>
                  <h4>Rs. {product.price}</h4>
                </div>
                <div className="p-4">
                  <h6>Rating</h6>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="">
                <button className="Continue" onClick={() => addcart(product)}>
                  {' '}
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="col-6 rightImg">
              <img src={product.image} alt="" />
            </div>
          </div>
        </div>
        <Cart />
      </div>
    );
}

export default Product;
