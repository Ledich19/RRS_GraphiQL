import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase';
import s from './Login.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <input
        type="text"
        className={s.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className={s.password}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        type="button"
        className={s.loginBtn}
        onClick={() => logInWithEmailAndPassword(email, password)}
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
