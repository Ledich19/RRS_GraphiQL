import { NavLink, Link } from 'react-router-dom';
import s from './Welcome.module.scss';

const Welcome = () => {
  return (
    <div className={s.Welcome}>
      <h1>Welcome</h1>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Registration</Link>
    </div>
  );
};

export default Welcome;
