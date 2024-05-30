import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Archive.css';

const Archive = () => {
    const [zakazy, setZakazy] = useState([]);

    useEffect(() => {
        const fetchZakazy = async () => {
            try {
                console.log('Fetching zakazy');
                const response = await axios.get('http://localhost:5000/api/zakazy');
                setZakazy(response.data);
            } catch (error) {
                console.error('Error fetching zakazy:', error);
            }
        };

        fetchZakazy();
    }, []);

    const toggleDetails = (id) => {
        setZakazy(zakazy.map(zakaz => {
            if (zakaz._id === id) {
                return { ...zakaz, showDetails: !zakaz.showDetails };
            }
            return zakaz;
        }));
    };

    return (
        <div className="archive-container">
            {zakazy.map(zakaz => (
                <div key={zakaz._id} className="archive-item">
                    <div className="main-info">
                        <div>Name: {zakaz.name}</div>
                        <div>Adress: {zakaz.adress}</div>
                        <div>Time: {zakaz.time}</div>
                        <div>Ves: {zakaz.ves}</div>
                        <div>Ras: {zakaz.ras}</div>
                    </div>
                    <button onClick={() => toggleDetails(zakaz._id)}>Toggle Details</button>
                    {zakaz.showDetails && (
                        <div className="additional-info">
                            <div>Is Frozen: {zakaz.isFrozen ? 'Yes' : 'No'}</div>
                            <div>Is Perishable: {zakaz.isPerishable ? 'Yes' : 'No'}</div>
                            <div>Is High Vehicle: {zakaz.isHighVehicle ? 'Yes' : 'No'}</div>
                            {/* Добавьте другие дополнительные параметры */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Archive;