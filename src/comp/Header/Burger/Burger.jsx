import React from "react";
import './Burger.css';
import { NavLink } from "react-router-dom";

const Burger = () => {
    return (
        <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
        <img className="logo" src='https://i.pinimg.com/originals/d0/b3/46/d0b346b2e7073bc5e24e372453df7dab.png' width="35"></img>
      <span></span>
    </label>

    <div class="menu__box">
      <ul>
   <li> <a> <NavLink to="/zakazy">План</NavLink> </a> </li>
    <li> <a><NavLink to="/route">Построение маршрута</NavLink></a></li>
   <li> <a><NavLink to="/archive">Архив</NavLink></a></li>
   <li><a> <NavLink to="/drivers">Водител</NavLink></a> </li>
    <li><a><NavLink to="/profile">Профиль</NavLink></a> </li>
    </ul>
</div>
  </div>
    )
}

export default Burger;