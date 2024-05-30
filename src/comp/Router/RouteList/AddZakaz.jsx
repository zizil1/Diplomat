import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AddZakaz.css';

const AddZakaz = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [adress, setAdress] = useState('');
    const [time, setTime] = useState('');
    const [ves, setVes] = useState('');
    const [ras, setRas] = useState('');
    const [orderDate, setOrderDate] = useState('');

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/drivers');
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const driver = drivers.find(driver => driver._id === selectedDriver);
        const newZakaz = { name: driver ? driver.name : '', adress, time, ves, ras, driver: selectedDriver, orderDate };
        try {
            console.log('Creating zakaz:', newZakaz);
            const response = await axios.post('http://localhost:5000/api/zakazy', newZakaz);
            console.log('Zakaz created successfully:', response.data);
            // Очистить поля формы после успешного создания заказа
            setSelectedDriver('');
            setAdress('');
            setTime('');
            setVes('');
            setRas('');
            setOrderDate('');
        } catch (error) {
            console.error('Error creating zakaz:', error);
        }
    };

    return (
        <div className="add-zakaz">
            <h2>Add Zakaz</h2>
            <form onSubmit={handleSubmit}>
                <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} required>
                    <option value="">Select Driver</option>
                    {drivers.map(driver => (
                        <option key={driver._id} value={driver._id}>{driver.name}</option>
                    ))}
                </select>
                <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)} placeholder="Adress" required />
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" required />
                <input type="text" value={ves} onChange={(e) => setVes(e.target.value)} placeholder="Ves" required />
                <input type="text" value={ras} onChange={(e) => setRas(e.target.value)} placeholder="Ras" required />
                <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
                <button type="submit">Add Zakaz</button>
            </form>
        </div>
    );
};

export default AddZakaz;