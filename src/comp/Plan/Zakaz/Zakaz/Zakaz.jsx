import React, { useState, useEffect } from "react";
import axios from 'axios';
import Data from "./Data/Data";
import './Zakaz.module.css';

const Zakaz = () => {
    const [zakazy, setZakazy] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchZakazy = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/zakazy');
                console.log('Fetched zakazy:', response.data); // Log fetched zakazy
                setZakazy(response.data);
            } catch (error) {
                console.error('Error fetching zakazy:', error);
            }
        };

        fetchZakazy();
    }, []);

    const filteredZakazy = zakazy.filter(zakaz => zakaz.orderDate === selectedDate);

    return (
        <div className="zakaz">
            <h2>Zakazy</h2>
            <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="kalendar" 
            />
            <div className="zakaz-list">
                {filteredZakazy.map(zakaz => (
                    <Data key={zakaz._id} {...zakaz} />
                ))}
            </div>
        </div>
    );
};

export default Zakaz;