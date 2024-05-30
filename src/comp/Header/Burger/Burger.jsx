import React from "react";
import './Burger.css';
import { NavLink } from "react-router-dom";

const Burger = () => {
    return (
        <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
        <img className="logo" src='https://yandex.ru/images/search?pos=11&from=tabbar&text=logo&img_url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F30%2FVector-based_example.svg%2F440px-Vector-based_example.svg.png&lr=10472&rpt=simage'></img>
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