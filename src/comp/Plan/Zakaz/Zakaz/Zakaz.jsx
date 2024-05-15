import React from "react";
import s from './Zakaz.module.css'
import Data from "./Data/Data";

let ZakazData = [
    {id:1, name: "#3567", adress:"Minsk-Gagarin-Vitebsk", time:'9.00', ves:"200kg", ras:"90km" },
    {id:2, name: "#5687", adress:'Minsk-Boruisk-Lida', time:'12.00', ves:"100kg", ras:"50km" }
]

let ZakazElement = ZakazData.map(zakaz => <Data id={zakaz.id} name={zakaz.name} adress={zakaz.adress} time={zakaz.time} ves={zakaz.ves} ras={zakaz.ras}/> )


const Zakaz = () => {
    return  <div className={s.zakaz}>
        <div><input className={s.kalendar} type="date" value="2024-04-23"/></div>
    <div className={s.dano}>
       {ZakazElement}
    </div> 
    <div></div>
</div>

}

export default Zakaz;