import React from 'react';

function CarList() {
  return (
    <div className="row">
      <div className="container">
        <h3>Vehicle List</h3>
        <div className="col-12 my-3">
          <div className="row carlist">
            {[0, 0, 0, 0].map((c) => (
              <>
                {/* car card */}
                <div className="col-md-4 mb-4">
                  <div className="card px-4 py-3">
                    <img
                      className="img-fluid"
                      src={require('../../assets/CarType/SUV.jpg').default}
                      alt=""
                    />
                    <h5 className="text-center mt-2 ">car name </h5>
                  </div>
                </div>
                {/*  car card */}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarList;
