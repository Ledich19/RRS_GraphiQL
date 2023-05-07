/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../app/firebase';
import { setVisibilityLangBox } from '../../reducers/languageReducer';
import Authorization from '../AuthorizationBtnBlock/AuthorizationBtnBlock';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
import HeaderLangBox from './HeaderLangBox/HeaderLangBox';
import { NotifyType, LangState } from '../../app/types';
import ua from '../../assets/ua-flag.png';
import en from '../../assets/usa-flag.png';
import ru from '../../assets/ru-flag.png';
import s from './Header.module.scss';

type State = { notify: NotifyType; languageOptions: LangState };

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const [header, setHeader] = useState(false);

  const { currentLang } = useSelector((state: State) => state.languageOptions);

  let lang;
  if (currentLang === 'en') lang = en;
  else if (currentLang === 'ua') lang = ua;
  else lang = ru;
  const dispatch = useDispatch();

  const handleHeaderClass = () => {
    if (window.scrollY >= 50) setHeader(true);
    else setHeader(false);
  };

  const showBoxLanguages = () => {
    dispatch(setVisibilityLangBox(true));
  };

  const headerLangBox = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleVisibility = (e: MouseEvent) => {
      return (
        headerLangBox.current?.contains(e.target as HTMLDivElement) ||
        dispatch(setVisibilityLangBox(false))
      );
    };
    document.addEventListener('click', handleVisibility);
    return () => document.removeEventListener('click', handleVisibility);
  }, [dispatch]);

  window.addEventListener('scroll', handleHeaderClass);
  return (
    <header className={!header ? s.header : `${s.header} ${s.active}`}>
      <div className={s.header__container}>
        <HeaderNavigation />
        <div className={s.header__langs} ref={headerLangBox}>
          <div className={s.header__lang} onClick={showBoxLanguages}>
            <img className={s.header__iconLang} src={lang} alt="current lang" />
          </div>
          <HeaderLangBox />
        </div>
        <div className={s.header__user}>
          <Authorization isUser={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
