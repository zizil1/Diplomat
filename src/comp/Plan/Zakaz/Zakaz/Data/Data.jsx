import React from "react";
import s from './Data.module.css';

const Data = ({ name, time, ves, ras, orderDate, startPoint, endPoint }) => {
    return (
        <div className={s.data}>
            <h3>Zakaz Details</h3>
            <p><strong>Driver Name:</strong> {name}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Weight (Ves):</strong> {ves}</p>
            <p><strong>Distance (Ras):</strong> {ras}</p>
            <p><strong>Order Date:</strong> {orderDate}</p>
            <p><strong>Start Point:</strong> {startPoint || 'N/A'}</p>
            <p><strong>End Point:</strong> {endPoint || 'N/A'}</p>
        </div>
    );
};

export default Data;