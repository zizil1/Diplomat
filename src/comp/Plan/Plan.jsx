import React from "react";
import s from './Plan.module.css'
import Zakaz from "./Zakaz/Zakaz/Zakaz";
import Karta from "./Karta/Karta";

const Plan = () => {
    return <div className={s.content}>
    <Zakaz /> 
    <Karta />
    
    </div>
}

export default Plan;