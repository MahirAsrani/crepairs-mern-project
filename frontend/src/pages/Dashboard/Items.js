import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Items() {
  const [cat, setcat] = useState();
  useEffect(() => {
    axios
      .get('/api/shop/category')
      .then((d) => setcat(d.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card p-3">
            <h5>Add new product</h5>

            <form>
              <div className="form-row">
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                  />
                </div>
                <div className="col-4">
                  <select name="" className="form-control m-0">
                    <option selected>Select Category</option>
                    {cat &&
                      cat.map((c) => <option value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-12 my-2">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                  />
                </div>
                <div className="col-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                  />
                </div>
                <div className="col-4">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
                  />
                </div>
                <div className="col-6 text-right">
                  <input
                    type="submit"
                    value="Add Product"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
