import { Link } from 'react-router-dom';
import s from './LoginBtn.module.scss';

const LoginBtn = () => {
  return (
    <Link to="/auth/login">
      <button type="button" className={s.login}>
        Login
      </button>
    </Link>
  );
};

export default LoginBtn;
