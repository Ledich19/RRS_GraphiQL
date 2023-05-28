import { useTranslation } from 'react-i18next';
import { logout } from '../../../app/firebase';
import s from './LogoutBtn.module.scss';

const LogoutBtn = () => {
  const { t } = useTranslation();
  return (
    <button type="button" className={s.logout} onClick={logout}>
      {t('logout')}
    </button>
  );
};

export default LogoutBtn;
