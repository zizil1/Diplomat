import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DriverCard from './DriverCard';

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/drivers/${id}`);
      setDrivers(drivers.filter(driver => driver._id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div>
      <h1>Drivers</h1>
      {drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <div>
          {drivers.map(driver => (
            <DriverCard key={driver._id} driver={driver} deleteDriver={deleteDriver} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DriversPage;