import React from "react";
import s from './Karta.module.css';
import Mapa from "./Map/Map";

const Karta = () => {
    return <div className={s.karta}>
        <Mapa/>
        {/* <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A447bafd47edd813bba4c6131b776877b5cce2237641a6e05276cfc88f8b41e80&amp;source=constructor" width="100%" height="450" frameborder="0"></iframe>    </div> */}
</div>
}

export default Karta;