import React, { useState, useEffect } from "react";
import axios from 'axios';
import DriverModal from "./DriverModal/DriverModal";
import './DriverPage.css';

const DriversPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                console.log('Fetching drivers');
                const response = await axios.get('http://localhost:5000/api/drivers');
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    const handleAddDriver = async (driverData) => {
        try {
            console.log('Adding driver:', driverData);
            const response = await axios.post('http://localhost:5000/api/drivers', driverData);
            console.log('Driver added successfully:', response.data);
            setDrivers([...drivers, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error('Error adding driver:', error);
        }
    };

    const handleDeleteDriver = async (id) => {
        try {
            console.log('Deleting driver:', id);
            await axios.delete(`http://localhost:5000/api/drivers/${id}`);
            setDrivers(drivers.filter(driver => driver._id !== id));
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    return (
        <div className="drivers-container">
            <h1>Drivers</h1>
            <button className="add-driver-button" onClick={() => setShowModal(true)}>Add Driver</button>
            {showModal && <DriverModal onClose={() => setShowModal(false)} onAddDriver={handleAddDriver} />}
            <div>
                {drivers.map(driver => (
                    <div key={driver._id} className="driver-card">
                        <p>Name: {driver.name}</p>
                        <p>Surname: {driver.surname}</p>
                        <p>Phone Number: {driver.phoneNumber}</p>
                        <p>City: {driver.city}</p>
                        <button onClick={() => handleDeleteDriver(driver._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriversPage;