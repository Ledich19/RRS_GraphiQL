import { logout } from '../../firebase';
import s from './LogoutBtn.module.scss';

const LogoutBtn = () => {
  return (
    <button type="button" className={s.logout} onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
