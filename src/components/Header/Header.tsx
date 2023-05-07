/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import Authorization from '../AuthorizationBtnBlock/AuthorizationBtnBlock';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
import uaFlag from '../../../public/img/ua-flag.png';
import usaFlag from '../../../public/img/usa-flag.png';
import s from './Header.module.scss';

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [lang, setLang] = useState(usaFlag);
  const [header, setHeader] = useState(false);

  const handleLanguage = () => {
    if (lang === usaFlag) setLang(uaFlag);
    else setLang(usaFlag);
  };

  const handleHeaderClass = () => {
    if (window.scrollY >= 50) setHeader(true);
    else setHeader(false);
  };

  window.addEventListener('scroll', handleHeaderClass);
  return (
    <header className={!header ? s.header : `${s.header} ${s.active}`}>
      <div className={s.header__container}>
        <HeaderNavigation />
        <div className={s.header__lang} onClick={handleLanguage}>
          <img className={s.header__iconLang} src={lang} alt="language" />
        </div>
        <div className={s.header__user}>
          <Authorization isUser={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
