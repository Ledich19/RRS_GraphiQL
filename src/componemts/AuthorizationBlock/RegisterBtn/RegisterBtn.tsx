import { Link } from 'react-router-dom';
import s from './RegisterBtn.module.scss';

const RegisterBtn = () => {
  return (
    <Link to="/auth/register">
      <button type="button" className={s.register}>
        Registration
      </button>
    </Link>
  );
};

export default RegisterBtn;
