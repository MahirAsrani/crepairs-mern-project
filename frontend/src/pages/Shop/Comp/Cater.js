import React from 'react';

function Cater({ cat, selected, setselect }) {
  function select(id) {
    if (selected === id) setselect(null);
    else setselect(id);
  }
  return (
    <div className="row categories">
      <div className="col-12">
        <h2>Categories</h2>
      </div>
      {cat &&
        cat.map((c) => (
          <div
            className={
              c._id === selected
                ? 'col card mb-4 selected'
                : 'col card cardhov mb-4'
            }
            onClick={() => select(c._id)}
          >
            <img src={c.image} alt="" />
            <p>{c.name}</p>
          </div>
        ))}
    </div>
  );
}

export default Cater;
