import { useTranslation } from 'react-i18next';
import s from './AboutUs.module.scss';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className={s.aboutUs}>
      <h1>{t('about')}</h1>
    </div>
  );
};

export default AboutUs;
