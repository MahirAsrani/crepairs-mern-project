import React from 'react';

function Cater({ cat }) {
  return (
    <div className="row categories">
      <div className="col-12">
        <h2>Categories</h2>
      </div>
      {cat &&
        cat.map((c) => (
          <div className="col card mb-4">
            <img src={c.image} alt="" />
            <p>{c.name}</p>
          </div>
        ))}
    </div>
  );
}

export default Cater;
