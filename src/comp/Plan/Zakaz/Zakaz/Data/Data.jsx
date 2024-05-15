import React from "react";
import s from './Data.module.css'

const Data = (props) => {
    return  <div className={s.data}>
        <div>
        Водитель: {props.name}
        </div>
    <div>
 {props.adress}
 <div> Прибытие: {props.time}
 </div>
 <div className={s.ves}> <i className={s.i}>{props.ves}</i> <i className={s.ii}>{props.ras}</i>
 <div className={s.niz}></div>
 </div>
    </div>
</div>
}

export default Data;