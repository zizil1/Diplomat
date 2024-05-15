import React from "react";
import s from './Logica.module.css'

const Logica = () => {
    return <div className={s.content}>
        <div className={s.vesn}>
            Вес, т
        <div className={s.ves}>0</div>
        <div className={s.ves}>0</div>
        </div>
        <div className={s.namen}>
            Объём, м3
        <div className={s.name}>0</div>
        <div className={s.name}>0</div>
</div>
    </div>
}

export default Logica;