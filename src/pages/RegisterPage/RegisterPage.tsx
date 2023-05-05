import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../app/firebase';
import s from './RegisterPage.module.scss';

const RegisterPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return (
    <div className={s.register}>
      <Outlet />
    </div>
  );
};
export default RegisterPage;
