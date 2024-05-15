import React from 'react';
import s from './Header.module.css';
import Burger from './Burger/Burger';

const Header = () => {
    return <header className={s.header}>
<div className={s.menu}>
  <Burger />    
      </div>
    </header>
}

export default Header