import React from "react";
import s from './DriverList.module.css'

const DriverList = () => {
    return <div className={s.content}>
        <p className={s.drivers}>Выбрать водителя</p>

        <div className={s.list}>
            №3475, Алексей Романов
        </div>
    </div>
}

export default DriverList;