import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendPasswordReset } from '../../app/firebase';
import s from './Reset.module.scss';
import LinkBtn from '../LinkBtn/LinkBtn';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/app');
  }, [user, loading, navigate]);
  return (
    <div className={s.reset}>
      <input
        type="text"
        className={s.textBox}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <button type="button" className={s.resetBtn} onClick={() => sendPasswordReset(email)}>
        Send password reset email
      </button>
      <div>
        Don&apos;t have an account?
        <LinkBtn to="/auth/register/" name="Register" className={s.register} />
      </div>
    </div>
  );
};
export default Reset;
