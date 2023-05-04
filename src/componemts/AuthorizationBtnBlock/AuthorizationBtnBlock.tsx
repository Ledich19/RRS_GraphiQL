import { User } from 'firebase/auth';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import s from './AuthorizationBtnBlock.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';

type PropsType = {
  isUser: User | null | undefined;
};

const AuthorizationBtnBlock = ({ isUser }: PropsType) => {
  return (
    <div className={s.authorization}>
      {isUser ? (
        <LogoutBtn />
      ) : (
        <>
          <LinkBtn to="/auth/login" name="login" className={s.login} /> /
          <LinkBtn to="/auth/register" name="register" className={s.register} />
        </>
      )}
    </div>
  );
};

export default AuthorizationBtnBlock;
