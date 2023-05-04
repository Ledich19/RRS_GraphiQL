import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../app/firebase';
import s from './Register.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';
import useSetNotify from '../../hooks/useSetNotify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const notify = useSetNotify(5000);

  const register = () => {
    if (!name) notify({ type: 'error', text: 'Please enter name' });
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/app');
  }, [user, loading, navigate]);

  return (
    <div className={s.register}>
      <div className={s.error}>{error ? error.message : ''}</div>
      <input
        type="text"
        className={s.textBox}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        className={s.textBox}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className={s.textBox}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="button" className={s.registerBtn} onClick={register}>
        Register
      </button>
      <button type="button" className={s.registerGoogle} onClick={signInWithGoogle}>
        Register with Google
      </button>

      <div>
        Already have an account?
        <LinkBtn to="/auth/login" name="Login" className={s.login} />
      </div>
    </div>
  );
};

export default Register;
