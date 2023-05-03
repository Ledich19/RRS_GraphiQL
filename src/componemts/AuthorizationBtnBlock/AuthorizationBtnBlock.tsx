import { query, collection, getDocs, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { auth, db, logout } from '../../firebase';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import Register from './RegisterBtn/RegisterBtn';
import s from './AuthorizationBtnBlock.module.scss';
import LoginBtn from './LoginBtn/LoginBtn';

type PropsType = {
  isUser: User | null | undefined;
};

const AuthorizationBtnBlock = ({ isUser }: PropsType) => {
  return (
    <div className={s.authorization}>
      {isUser ? (
        <LogoutBtn />
      ) : (
        <>
          <LoginBtn />/<Register />
        </>
      )}
    </div>
  );
};

export default AuthorizationBtnBlock;
