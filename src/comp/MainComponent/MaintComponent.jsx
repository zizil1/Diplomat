import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mapa from '../Plan/Karta/Map/Map';
import Zakaz from '../Plan/Zakaz/Zakaz/Zakaz';
import AddZakaz from '../Router/RouteList/AddZakaz';


const MainComponent = () => {
    const [zakazy, setZakazy] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedStartPoint, setSelectedStartPoint] = useState(null);
    const [selectedEndPoint, setSelectedEndPoint] = useState(null);
  
    const fetchZakazy = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/zakazy');
        setZakazy(response.data);
      } catch (error) {
        console.error('Error fetching zakazy:', error);
      }
    };
  
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
  
    useEffect(() => {
      fetchZakazy();
      fetchDrivers();
    }, []);
  
    const handleZakazClick = (zakaz) => {
      const startPoint = zakaz.startPoint.split(',').map(Number);
      const endPoint = zakaz.endPoint.split(',').map(Number);
      setSelectedStartPoint(startPoint);
      setSelectedEndPoint(endPoint);
    };
  
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          <Mapa startPoint={selectedStartPoint} endPoint={selectedEndPoint} />
        </div>
        <div style={{ width: '30%', padding: '20px' }}>
          <AddZakaz fetchZakazy={fetchZakazy} drivers={drivers} />
          <Zakaz zakazy={zakazy} onZakazClick={handleZakazClick} />
        </div>
      </div>
    );
  };
  
  export default MainComponent;