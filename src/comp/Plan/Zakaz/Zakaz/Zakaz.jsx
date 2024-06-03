import React, { useState, useEffect } from "react";
import axios from 'axios';
import Data from "./Data/Data";
import s from './Zakaz.module.css';

const Zakaz = ({ onSelectZakaz }) => {
    const [zakazy, setZakazy] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedZakaz, setSelectedZakaz] = useState(null);

    useEffect(() => {
        const fetchZakazy = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/zakazy');
                setZakazy(response.data);
            } catch (error) {
                console.error('Error fetching zakazy:', error);
            }
        };

        fetchZakazy();
    }, []);

    const filteredZakazy = zakazy.filter(zakaz => zakaz.orderDate === selectedDate);

    const handleZakazClick = (zakaz) => {
        onSelectZakaz(zakaz);
        setSelectedZakaz(zakaz);
    };

    return (
        <div className={s.zakaz}>
            <h2>Zakazy</h2>
            <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className={s.kalendar} 
            />
            <div className={s.zakaz_list}>
                {filteredZakazy.map(zakaz => (
                    <div 
                        key={zakaz._id} 
                        className={`${s.zakaz_item} ${selectedZakaz === zakaz ? s.selected : ''}`} 
                        onClick={() => handleZakazClick(zakaz)}
                    >
                        <Data 
                            name={zakaz.name}
                            time={zakaz.time}
                            ves={zakaz.ves}
                            ras={zakaz.ras}
                            orderDate={zakaz.orderDate}
                            startPoint={zakaz.startPoint}
                            endPoint={zakaz.endPoint}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Zakaz;