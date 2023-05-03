import Authorization from '../../componemts/AuthorizationBlock/Authorization';
import s from './Welcome.module.scss';

const Welcome = () => {
  return (
    <div className={s.Welcome}>
      <h1>Welcome</h1>
      <Authorization />
    </div>
  );
};

export default Welcome;
