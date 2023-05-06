/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../../reducers/languageReducer';
import uaFlag from '../../../assets/ua-flag.png';
import usaFlag from '../../../assets/usa-flag.png';
import ruFlag from '../../../assets/ru-flag.png';
import { LangState, NotifyType } from '../../../app/types';
import s from '../Header.module.scss';

const HeaderLangBox = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { visibilityLangBox } = useSelector(
    (state: { notify: NotifyType; languageOptions: LangState }) => state.languageOptions
  );

  return (
    <div className={s.header__langsBox} style={{ opacity: visibilityLangBox ? '1' : '0' }}>
      <img
        className={s.header__iconLang}
        src={usaFlag}
        alt="usa"
        onClick={() => {
          dispatch(setLanguage('en'));
          i18n.changeLanguage('en');
        }}
      />
      <img
        className={s.header__iconLang}
        src={uaFlag}
        alt="ua"
        onClick={() => {
          dispatch(setLanguage('ua'));
          i18n.changeLanguage('ua');
        }}
      />
      <img
        className={s.header__iconLang}
        src={ruFlag}
        alt="ru"
        onClick={() => {
          dispatch(setLanguage('ru'));
          i18n.changeLanguage('ru');
        }}
      />
    </div>
  );
};

export default HeaderLangBox;
