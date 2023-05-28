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
  const flags = [
    { country: 'en', linkToImg: usaFlag },
    { country: 'ru', linkToImg: ruFlag },
    { country: 'ua', linkToImg: uaFlag },
  ];
  const { visibilityLangBox } = useSelector(
    (state: { notify: NotifyType; languageOptions: LangState }) => state.languageOptions
  );
  return (
    <div
      className={s.header__langsBox}
      style={{
        opacity: visibilityLangBox ? '1' : '0',
        visibility: visibilityLangBox ? 'visible' : 'hidden',
      }}
    >
      {flags.map((country) => {
        return (
          <img
            className={s.header__iconLang}
            src={country.linkToImg}
            alt={country.country}
            key={country.country}
            onClick={() => {
              dispatch(setLanguage(country.country));
              i18n.changeLanguage(country.country);
            }}
          />
        );
      })}
    </div>
  );
};

export default HeaderLangBox;
