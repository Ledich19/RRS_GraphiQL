import LogoutBtn from '../../componemts/AuthorizationBlock/LogoutBtn/LogoutBtn';
import s from './AboutUs.module.scss';

const AboutUs = () => {
  return (
    <div className={s.aboutUs}>
      <h1>About Us</h1>
      <p>AboutUs AboutUs AboutUs</p>
      <LogoutBtn />
    </div>
  );
};

export default AboutUs;
