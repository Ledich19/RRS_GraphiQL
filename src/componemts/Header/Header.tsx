import { NavLink } from 'react-router-dom';
import React from 'react';
import s from './Header.module.scss';
import Login from '../Login/Login';

const Header: React.FC = () => {
  return (
    <>
      <div className={s.header}>
        <NavLink to="/" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
          Home
        </NavLink>
        <NavLink to="/blank" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
          Add book
        </NavLink>
        <NavLink to="/about" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
          About us
        </NavLink>
      </div>
      <Login />
    </>
  );
};

export default Header;
