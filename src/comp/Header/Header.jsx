import React from 'react';
import './Header.module.css';
import Burger from './Burger/Burger';

const Header = ({ showBurger }) => {
  return (
    <header className="header">
      {showBurger && <Burger />}
    </header>
  );
};

export default Header;