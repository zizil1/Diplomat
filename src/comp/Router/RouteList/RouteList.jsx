import React from "react";
import s from './RouteList.module.css'

const RouteList = () => {
    return <div className={s.content}>
        <p className={s.centr}>Построить маршрут</p>
        <div className={s.list}>
            Беларусь, Минск, улица Инженерная, 14/2
        </div>
        <div className={s.list}>
            Россия, Смоленская область, Гагарин, улица 
        </div>
    </div>
}

export default RouteList;