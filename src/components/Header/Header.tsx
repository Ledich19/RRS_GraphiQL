/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../app/firebase';
import Authorization from '../AuthorizationBtnBlock/AuthorizationBtnBlock';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
import uaFlag from '../../assets/ua-flag.png';
import usaFlag from '../../assets/usa-flag.png';
import ruFlag from '../../assets/ru-flag.png';
import s from './Header.module.scss';

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [lang, setLang] = useState(usaFlag);
  const [header, setHeader] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const { t, i18n } = useTranslation();

  const handleHeaderClass = () => {
    if (window.scrollY >= 50) setHeader(true);
    else setHeader(false);
  };

  const showBoxLanguages = () => {
    setShowLangs(true);
  };

  const hideBoxLanguages = () => {
    setShowLangs(false);
  };

  window.addEventListener('scroll', handleHeaderClass);
  return (
    <header className={!header ? s.header : `${s.header} ${s.active}`}>
      <div className={s.header__container}>
        <HeaderNavigation />
        <div className={s.header__lang} onClick={showBoxLanguages}>
          <img className={s.header__iconLang} src={lang} alt="current lang" />
        </div>
        <div className={s.header__langsBox} style={{ opacity: showLangs ? '1' : '0' }}>
          <img
            className={s.header__iconLang}
            src={usaFlag}
            alt="usa"
            onClick={() => {
              hideBoxLanguages();
              setLang(usaFlag);
              i18n.changeLanguage('en');
            }}
          />
          <img
            className={s.header__iconLang}
            src={uaFlag}
            alt="ua"
            onClick={() => {
              hideBoxLanguages();
              setLang(uaFlag);
              i18n.changeLanguage('ua');
            }}
          />
          <img
            className={s.header__iconLang}
            src={ruFlag}
            alt="ru"
            onClick={() => {
              hideBoxLanguages();
              setLang(ruFlag);
              i18n.changeLanguage('ru');
            }}
          />
        </div>
        <div className={s.header__user}>
          <Authorization isUser={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
