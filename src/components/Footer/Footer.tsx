import { Link } from 'react-router-dom';
import React from 'react';
import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <Link to="https://rs.school/" className={style.rsschool} />
      <span className={style.year}>2023</span>
      <div className={style.authors}>
        <Link to="https://github.com/ledich19" className={style.author}>
          <img src="./img/logo-git.png" alt="git-logo" className={style.author_logo} />
          ledich19
        </Link>
        <Link to="https://github.com/pedanmax" className={style.author}>
          <img src="./img/logo-git.png" alt="git-logo" className={style.author_logo} />
          pedanmax
        </Link>
        <Link to="https://github.com/NRG-Spirit" className={style.author}>
          <img src="./img/logo-git.png" alt="git-logo" className={style.author_logo} />
          nrg-spirit
        </Link>
      </div>
    </div>
  );
};

export default Footer;
