import React from "react";
import s from './Router.module.css';
import RouteList from "./RouteList/RouteList";
import DriverList from "./DriverList/DriverList";
import Logica from "./Logica/Logica";

const Router = () => {
    return <div className={s.content}>
       
                <p className={s.h}>Маршруты</p>
<div className={s.inf}>
    <div className={s.block}>
    <div className={s.listrout}>
        <RouteList />
    </div>
    <button className={s.delete}>Сбросить</button>
    <div className={s.listdriv}>
        <DriverList />
        </div>
        
    <div className={s.line}>
    </div>
    <div className={s.logics}>
        <Logica />
    </div>
    </div>

    <div className={s.function}>
       <p className={s.dop}> Дополнительные функции: </p>
        <ul>
            <li>Высокая машина</li>
            <li>Замороженная продукция</li>
            <li>Быстропортящиеся товары</li>
            <li>и</li>
            <li>ещё</li>
            <li>много</li>
            <li>разных</li>
            <li>параметров</li>
            <li>которые</li>
            <li>займут</li>
            <li>пустое</li>
            <li>место</li>
        </ul>
    </div>
    {/* <div>
        <button className={s.change}>Редактировать</button>
    </div> */}

</div>

    

    <div>
        <button className={s.archive}>Занести в архив</button>
    </div>

    </div>
}

export default Router;