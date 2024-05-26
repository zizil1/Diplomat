import React from 'react';

const DriverCard = ({ driver, deleteDriver }) => {
  return (
    <div>
      <h2>{driver.name}</h2>
      <p>Age: {driver.age}</p>
      <button onClick={() => deleteDriver(driver._id)}>Delete</button>
    </div>
  );
};

export default DriverCard;