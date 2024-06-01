import React from 'react';
import s from './Data.module.css';

const Data = ({ id, name, adress, time, ves, ras, onClick }) => {
  return (
    <div className={s.data} onClick={onClick}>
      <div>
        Водитель: {name}
      </div>
      <div>
        {adress}
        <div> Прибытие: {time} </div>
        <div className={s.ves}>
          <i className={s.i}>{ves}</i> <i className={s.ii}>{ras}</i>
          <div className={s.niz}></div>
        </div>
      </div>
    </div>
  );
};

export default Data;