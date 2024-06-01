
import React, { useState } from 'react';
import axios from 'axios';
import s from './AddZakaz.css';

const AddZakaz = ({ fetchZakazy, drivers }) => {
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [time, setTime] = useState('');
    const [ves, setVes] = useState('');
    const [ras, setRas] = useState('');
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');
    const [date, setDate] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/api/zakazy', {
          name: selectedDriver,
          adress,
          time,
          ves,
          ras,
          startPoint,
          endPoint,
          date,
        });
        fetchZakazy();
        setName('');
        setAdress('');
        setTime('');
        setVes('');
        setRas('');
        setStartPoint('');
        setEndPoint('');
        setDate('');
        setSelectedDriver('');
      } catch (error) {
        console.error('Error creating zakaz:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formGroup}>
          <label>Водитель:</label>
          <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} required>
            <option value="">Выберите водителя</option>
            {drivers.map(driver => (
              <option key={driver._id} value={driver.name}>{driver.name}</option>
            ))}
          </select>
        </div>
        <div className={s.formGroup}>
          <label>Адрес:</label>
          <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)} required />
        </div>
        <div className={s.formGroup}>
          <label>Время:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div className={s.formGroup}>
          <label>Вес:</label>
          <input type="text" value={ves} onChange={(e) => setVes(e.target.value)} required />
        </div>
        <div className={s.formGroup}>
          <label>Расстояние:</label>
          <input type="text" value={ras} onChange={(e) => setRas(e.target.value)} required />
        </div>
        <div className={s.formGroup}>
          <label>Начальная точка:</label>
          <input type="text" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} required />
        </div>
        <div className={s.formGroup}>
          <label>Конечная точка:</label>
          <input type="text" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} required />
        </div>
        <div className={s.formGroup}>
          <label>Дата:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Добавить заказ</button>
      </form>
    );
  };
  
  export default AddZakaz;