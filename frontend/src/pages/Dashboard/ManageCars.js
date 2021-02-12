import React from 'react';

export const ManageCars = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h3>Manage Manufacturers & Cars </h3>
          </div>
          <div className="col text-center">
            <button className="btn btn-info">Add New</button>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-2">
            <div className="card ">
              <img
                src={require('../../assets/Brands/Audi.jpg').default}
                alt="Brand"
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card ">
              <img
                src={require('../../assets/Brands/BMW.jpg').default}
                alt="Brand"
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card ">
              <img
                src={require('../../assets/Brands/Kia.jpg').default}
                alt="Brand"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">form</div>
          </div>
        </div>
      </div>
    </div>
  );
};
