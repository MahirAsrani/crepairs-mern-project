import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Items() {
  const [cat, setcat] = useState();
  useEffect(() => {
    axios
      .get('/api/shop/category')
      .then((d) => setcat(d.data))
      .catch((e) => console.log(e));
  }, []);

  const [load, setload] = useState(false);

  function handleForm(e) {
    e.preventDefault();
    setload(true);
    const name = e.target.name.value;
    const desc = e.target.desc.value;
    const category = e.target.catg.value;
    const price = e.target.price.value;
    const img = e.target.img.files[0];

    const data = new FormData();
    data.append('img', img);
    data.append('name', name);
    data.append('desc', desc);
    data.append('category', category);
    data.append('price', price);

    axios
      .post('/api/shop/product/add', data)
      .then(() => toast.success('Added'))
      .catch((e) => console.log(e))
      .finally((e) => setload(false));
  }
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card p-3">
            <h5>Add new product</h5>

            <form
              method="post"
              autoComplete="off"
              onSubmit={(e) => handleForm(e)}
            >
              <div className="form-row">
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                    name="name"
                    required
                  />
                </div>
                <div className="col-4">
                  <select name="catg" className="form-control m-0">
                    <option disabled selected>
                      Select Category
                    </option>
                    {cat &&
                      cat.map((c) => <option value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-12 my-2">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    name="desc"
                    required
                  />
                </div>
                <div className="col-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    required
                  />
                </div>
                <div className="col-4">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
                    accept="image/*"
                    name="img"
                  />
                </div>
                <div className="col-6 text-right">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={load}
                  >
                    Add Product
                    {load && (
                      <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                  </button>
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
