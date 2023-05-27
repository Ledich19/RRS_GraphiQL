import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../app/firebase';
import s from './Login.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/app');
  }, [user, loading, navigate]);

  return (
    <div className={s.login}>
      <div className={s.error}>{error ? error.message : ''}</div>
      <input
        type="text"
        className={s.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailAdress')}
      />
      <input
        type="password"
        className={s.password}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('password')}
      />
      <button
        type="button"
        className={s.loginBtn}
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        {t('login')}
      </button>
      <button type="button" className={s.loginGoogle} onClick={signInWithGoogle}>
        {t('loginWith')}
      </button>
      <div>
        <LinkBtn to="/auth/reset" name={t('forgotPassword')} className={s.forgotBtn} />
      </div>
      <div className={s.text}>
        {t('dontHaveAccount')}{' '}
        <LinkBtn to="/auth/sign-up" name={t('register')} className={s.register} />
        {t('now')}
      </div>
    </div>
  );
};

export default Login;
