import { Link } from 'react-router-dom';
import React from 'react';
import style from './Footer.module.scss';
import logoRed from '../../assets/logo/logo-git-red.png';
import logoGreen from '../../assets/logo/logo-git-green.png';
import logoBlue from '../../assets/logo/logo-git-blue.png';

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <Link to="https://rs.school/" target="_blank" className={style.rsschool} />
      <span className={style.year}>2023</span>
      <div className={style.authors}>
        <Link to="https://github.com/ledich19" target="_blank" className={style.author1}>
          <img src={logoRed} alt="git-logo" className={style.logo} />
          ledich19
        </Link>
        <Link to="https://github.com/pedanmax" target="_blank" className={style.author2}>
          <img src={logoBlue} alt="git-logo" className={style.logo} />
          pedanmax
        </Link>
        <Link to="https://github.com/NRG-Spirit" target="_blank" className={style.author3}>
          <img src={logoGreen} alt="git-logo" className={style.logo} />
          nrg-spirit
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
