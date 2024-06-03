import React from "react";
import { useState } from "react";
import s from './Plan.module.css';
import Zakaz from "./Zakaz/Zakaz/Zakaz";
import Mapa from "./Karta/Map/Map";

const Plan = () => {
    const [selectedZakaz, setSelectedZakaz] = useState(null);

    return (
        <div className={s.content}>
            <Zakaz onSelectZakaz={setSelectedZakaz} /> 
            <Mapa startPoint={selectedZakaz?.startPoint} endPoint={selectedZakaz?.endPoint} />
        </div>
    );
}

export default Plan;