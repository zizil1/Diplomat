import React from "react";
import './Data.module.css';

const Data = (props) => {
    return (
        <div className="data">
            <div>Водитель: {props.name}</div>
            <div>Адрес: {props.adress}</div>
            <div>Прибытие: {props.time}</div>
            <div className="ves"><i>{props.ves}</i> <i>{props.ras}</i></div>
        </div>
    );
};

export default Data;