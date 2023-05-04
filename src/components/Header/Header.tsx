import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import Authorization from '../AuthorizationBtnBlock/AuthorizationBtnBlock';
import s from './Header.module.scss';

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <nav className={s.header__navigation}>
          <ul className={s.header__list}>
            <li className={s.header__item}>
              <NavLink to="/" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
                Home
              </NavLink>
            </li>
            <li className={s.header__item}>
              <NavLink to="/app" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
                Editor
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={s.header__lang}>language: en</div>
        <div className={s.header__user}>
          <Authorization isUser={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
