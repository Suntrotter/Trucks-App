import React from 'react';
import TravelTrucksLogo from '../../assets/pictures/TravelTrucks.png';
import { NavLink } from 'react-router-dom';  
import css from "./Header.module.css";

const Header = () => {
    return (
        <div>
          <header className={css.header}>
            <img src={TravelTrucksLogo} className={css.logo} alt="logo" />
            <nav>
              <ul className={css.navigation}>
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? css.activeLink : ''} 
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/catalog" 
                    className={({ isActive }) => isActive ? css.activeLink : ''}
                  >
                    Catalog
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>
        </div>
    );
};

export default Header;
