import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../app/firebase';
import s from './Login.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';
import useInput from '../../hooks/useInput';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const email = useInput();
  const password = useInput();

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

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
        value={email.value}
        onChange={(e) => email.onChange(e)}
        onBlur={(e) => email.onBlur(e)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className={s.password}
        value={password.value}
        onChange={(e) => password.onChange(e)}
        onBlur={(e) => password.onBlur(e)}
        placeholder="Password"
      />
      <button
        type="button"
        className={s.loginBtn}
        onClick={() => logInWithEmailAndPassword(email.value || '', password.value || '')}
      >
        Login
      </button>
      <button type="button" className={s.loginGoogle} onClick={signInWithGoogle}>
        Login with Google
      </button>
      <div>
        <LinkBtn to="/auth/reset" name="Forgot Password" className={s.forgotBtn} />
      </div>
      <div>
        Don&apos;t have an account?{' '}
        <LinkBtn to="/auth/register" name="Register" className={s.register} />
        now.
      </div>
    </div>
  );
};

export default Login;
