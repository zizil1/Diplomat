import React, { useState } from 'react';
import s from './Zakaz.module.css';
import Data from './Data/Data';


const Zakaz = ({ zakazy, onZakazClick }) => {
    const [selectedDate, setSelectedDate] = useState('');
  
    const filteredZakazy = zakazy.filter(zakaz => zakaz.date === selectedDate);
  
    const ZakazElement = filteredZakazy.map(zakaz => (
      <Data
        key={zakaz._id}
        id={zakaz._id}
        name={zakaz.name}
        adress={zakaz.adress}
        time={zakaz.time}
        ves={zakaz.ves}
        ras={zakaz.ras}
        onClick={() => onZakazClick(zakaz)}
      />
    ));
  
    return (
      <div className={s.zakaz}>
        <div>
          <input
            className={s.kalendar}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className={s.dano}>
          {ZakazElement}
        </div>
        <div></div>
      </div>
    );
  };
  
  export default Zakaz;