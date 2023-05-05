import { Link } from 'react-router-dom';
import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <Link to="https://rs.school/" className="footer__rs-link" />
      <span className="footer__year">2023</span>
      <div className="footer__authors">
        <Link to="https://github.com/ledich19" className="footer__author">
          <img src="./img/logo-git.png" alt="git-logo" className="footer__author_logo" />
          ledich19
        </Link>
        <Link to="https://github.com/pedanmax" className="footer__author">
          <img src="./img/logo-git.png" alt="git-logo" className="footer__author_logo" />
          pedanmax
        </Link>
        <Link to="https://github.com/NRG-Spirit" className="footer__author">
          <img src="./img/logo-git.png" alt="git-logo" className="footer__author_logo" />
          nrg-spirit
        </Link>
      </div>
    </div>
  );
};

export default Footer;
