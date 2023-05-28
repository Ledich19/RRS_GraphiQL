import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import s from './AuthorizationBtnBlock.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';

type PropsType = {
  isUser: User | null | undefined;
};

const AuthorizationBtnBlock = ({ isUser }: PropsType) => {
  const { t } = useTranslation();
  return (
    <div className={s.authorization}>
      {isUser ? (
        <>
          <LogoutBtn /> /&nbsp;
          <LinkBtn to="/editor" name={t('goToMainPage')} className={s.register} />
        </>
      ) : (
        <>
          <LinkBtn to="/auth/sign-in" name={t('login')} className={s.login} /> /&nbsp;
          <LinkBtn to="/auth/sign-up" name={t('register')} className={s.register} />
        </>
      )}
    </div>
  );
};

export default AuthorizationBtnBlock;
