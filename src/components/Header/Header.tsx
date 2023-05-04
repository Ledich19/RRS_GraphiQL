import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import Authorization from '../AuthorizationBtnBlock/AuthorizationBtnBlock';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
import s from './Header.module.scss';

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <HeaderNavigation />
        <div className={s.header__lang}>language: en</div>
        <div className={s.header__user}>
          <Authorization isUser={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
