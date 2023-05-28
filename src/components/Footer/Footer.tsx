import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { auth, logout } from '../../app/firebase';
import style from './Footer.module.scss';
import logoRed from '../../assets/logo/logo-git-red.png';
import logoGreen from '../../assets/logo/logo-git-green.png';
import logoBlue from '../../assets/logo/logo-git-blue.png';

interface DecodedToken {
  exp: number;
}

const Footer: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutID: NodeJS.Timer;
    const getToken = async () => {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        const { exp } = decodeToken(token) as DecodedToken;
        timeoutID = setInterval(() => {
          if (Math.floor(Date.now() / 1000) >= exp) {
            logout();
            navigate('/');
          }
        }, 5000);
      }
    };
    getToken();

    return () => {
      window.clearTimeout(timeoutID);
    };
  }, [user, loading, navigate]);

  return (
    <footer className={style.footer}>
      <Link to="https://rs.school/" className={style.rsschool} />
      <span className={style.year}>2023</span>
      <div className={style.authors}>
        <Link to="https://github.com/ledich19" className={style.author1}>
          <img src={logoRed} alt="git-logo" className={style.logo} />
          ledich19
        </Link>
        <Link to="https://github.com/pedanmax" className={style.author2}>
          <img src={logoBlue} alt="git-logo" className={style.logo} />
          pedanmax
        </Link>
        <Link to="https://github.com/NRG-Spirit" className={style.author3}>
          <img src={logoGreen} alt="git-logo" className={style.logo} />
          nrg-spirit
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
