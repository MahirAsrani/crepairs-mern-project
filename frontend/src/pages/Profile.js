import React, { useContext, useEffect, useState } from 'react';
import { myContext } from '../Context';
import './profile.css';

function Profile() {
  const { user, auth, isheader } = useContext(myContext);

  const [form, setForm] = useState({
    fullName: user.name,
    phoneNo: user.phone,
    email: user.email,
    houseNo: null,
    street: null,
    city: null,
    pincode: null,
    country: 'INDIA',
  });

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row py-5">
          <div className="col-md-3 profile_menu">
            <ul>
              <li className="active">Profile</li>
              <li>Bookings</li>
              <li>Password</li>
            </ul>
          </div>
          <div className="col-md-6 shadow card profilecard p-5">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={require('../assets/dp.png').default}
                      alt="pic"
                      height="100px"
                    />
                  </div>
                  <div className="col-9 mt-auto mb-3">
                    <button className="btn profile-btn upload">Upload</button>
                    <button className="btn profile-btn">Remove</button>
                  </div>
                </div>
              </div>
              <hr className="hr-custom my-4" />
              <div className="col-12 mb-3">
                <h6>Full Name</h6>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  value={form.fullName}
                />
              </div>
              <div className="col-6">
                <h6>Email</h6>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  value={form.email}
                />
              </div>
              <div className="col-6">
                <h6>Phone No</h6>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, phoneNo: e.target.value })
                  }
                  value={form.phoneNo}
                />
              </div>
              <div className="col-12 text-right mt-4">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
