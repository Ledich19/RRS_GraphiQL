import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../firebase';
import Authorization from '../../componemts/AuthorizationBtnBlock/AuthorizationBtnBlock';
import s from './Welcome.module.scss';

const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={s.Welcome}>
      <h1>Welcome</h1>
      <Authorization isUser={user} />
      {!user || (
        <Link to="/app">
          <button type="button" className={s.button}>
            Start
          </button>
        </Link>
      )}
    </div>
  );
};

export default Welcome;
