import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../app/firebase';
import Authorization from '../../components/AuthorizationBtnBlock/AuthorizationBtnBlock';
import s from './Welcome.module.scss';
import UserInfo from '../../components/UserInfo/UserInfo';
import LinkBtn from '../../components/LinkBtn/LinkBtn';

const Welcome = () => {
  const [user] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  return (
    <div className={s.welcome}>
      <UserInfo />
      <h1>{t('welcome')}</h1>
      {!!user || <Authorization isUser={user} />}
      {!user || <LinkBtn to="/editor" name={t('start')} className={s.neonButton} />}
    </div>
  );
};

export default Welcome;
