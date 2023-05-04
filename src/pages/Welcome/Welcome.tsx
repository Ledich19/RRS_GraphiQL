import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import Authorization from '../../componemts/AuthorizationBtnBlock/AuthorizationBtnBlock';
import s from './Welcome.module.scss';
import UserInfo from '../../componemts/UserInfo/UserInfo';
import LinkBtn from '../../componemts/LinkBtn/LinkBtn';

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
