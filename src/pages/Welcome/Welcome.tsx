import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../firebase';
import Authorization from '../../components/AuthorizationBtnBlock/AuthorizationBtnBlock';
import s from './Welcome.module.scss';
import UserInfo from '../../components/UserInfo/UserInfo';
import LinkBtn from '../../components/LinkBtn/LinkBtn';

const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={s.Welcome}>
      <UserInfo />
      <h1>Welcome</h1>
      <Authorization isUser={user} />
      {!user || <LinkBtn to="/app" name="Start" className={s.button} />}
    </div>
  );
};

export default Welcome;
