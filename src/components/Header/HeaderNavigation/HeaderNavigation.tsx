import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import s from '../Header.module.scss';

const HeaderNavigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <nav className={s.header__navigation}>
      <ul className={s.header__list}>
        <li className={s.header__item}>
          <NavLink to="/" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
            {t('home')}
          </NavLink>
        </li>
        <li className={s.header__item}>
          <NavLink to="/app" className={(info) => (info.isActive ? s.activeLink : s.navLink)}>
            Editor
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
