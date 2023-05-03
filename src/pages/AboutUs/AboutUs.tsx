import { logout } from '../../firebase';
import s from './AboutUs.module.scss';

const AboutUs = () => {
  return (
    <div className={s.aboutUs}>
      <h1>About Us</h1>
      <p>AboutUs AboutUs AboutUs</p>
      <button type="button" className="RegisterPage__btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AboutUs;
