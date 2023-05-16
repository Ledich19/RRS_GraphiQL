import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import s from './AuthorizationBtnBlock.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';

type PropsType = {
  isUser: User | null | undefined;
};

const AuthorizationBtnBlock = ({ isUser }: PropsType) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={s.authorization}>
      {isUser ? (
        <>
          <LogoutBtn /> /&nbsp;
          <LinkBtn to="/" name={t('goToMainPage')} className={s.register} />
        </>
      ) : (
        <>
          <LinkBtn to="/auth/login" name={t('login')} className={s.login} /> /&nbsp;
          <LinkBtn to="/auth/register" name={t('register')} className={s.register} />
        </>
      )}
    </div>
  );
};

export default AuthorizationBtnBlock;
