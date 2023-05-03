import { query, collection, getDocs, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../firebase';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import Register from './RegisterBtn/RegisterBtn';
import s from './Authorization.module.scss';
import LoginBtn from './LoginBtn/LoginBtn';

const Authorization = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className={s.authorization}>
      {user ? (
        <LogoutBtn />
      ) : (
        <>
          <LoginBtn />/<Register />
        </>
      )}
    </div>
  );
};

export default Authorization;
