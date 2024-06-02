import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AddZakaz.css';
import Mapa from "../../Plan/Karta/Map/Map";

const AddZakaz = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [startPoint, setStartPoint] = useState({ latitude: '', longitude: '' });
    const [endPoint, setEndPoint] = useState({ latitude: '', longitude: '' });
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
        const newZakaz = { 
          name: driver ? driver.name : '', 
          time, 
          ves, 
          ras, 
          driver: selectedDriver, 
          orderDate, 
          startPoint, 
          endPoint 
        };
        try {
            console.log('Creating zakaz:', newZakaz);
            const response = await axios.post('http://localhost:5000/api/zakazy', newZakaz);
            console.log('Zakaz created successfully:', response.data);
            // Очистить поля формы после успешного создания заказа
            setSelectedDriver('');
            setTime('');
            setVes('');
            setRas('');
            setOrderDate('');
            // Сбросить также начальную и конечную точки
            setStartPoint({ latitude: '', longitude: '' });
            setEndPoint({ latitude: '', longitude: '' });
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
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" required />
                <input type="text" value={ves} onChange={(e) => setVes(e.target.value)} placeholder="Ves" required />
                <input type="text" value={ras} onChange={(e) => setRas(e.target.value)} placeholder="Ras" required />
                <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />

                {/* Добавляем поля для ввода начальной и конечной точек */}
                <input 
                    type="text" 
                    value={startPoint.latitude} 
                    onChange={(e) => setStartPoint({ ...startPoint, latitude: e.target.value })} 
                    placeholder="Start Point" 
                    required 
                />
                <input 
                    type="text" 
                    value={startPoint.longitude} 
                    onChange={(e) => setStartPoint({ ...startPoint, longitude: e.target.value })} 
                    placeholder="Start Point" 
                    required 
                />
                <input 
                    type="text" 
                    value={endPoint.latitude} 
                    onChange={(e) => setEndPoint({ ...endPoint, latitude: e.target.value })} 
                    placeholder="End Point" 
                    required 
                />
                <input 
                    type="text" 
                    value={endPoint.longitude} 
                    onChange={(e) => setEndPoint({ ...endPoint, longitude: e.target.value })} 
                    placeholder="End Point" 
                    required 
                />
                <button type="submit">Add Zakaz</button>
            </form>

            {/* Отображаем карту с переданными точками */}
            {startPoint.latitude && startPoint.longitude && endPoint.latitude && endPoint.longitude && <Mapa startPoint={startPoint} endPoint={endPoint} />}
        </div>
    );
};

export default AddZakaz;