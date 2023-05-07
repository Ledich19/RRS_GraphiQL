import { useEffect } from 'react';
import { useAuthState, useIdToken } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../app/firebase';
import s from './RegisterPage.module.scss';

const RegisterPage = () => {
  const [user, loading] = useAuthState(auth);
  const [user1, loading1, error1] = useIdToken(auth);
  const navigate = useNavigate();
  console.log('user1', user1);

  useEffect(() => {
    console.log(user1);
    if (loading) return;
    // const getTocen = async () => {
    //   const token = await auth;
    // };
    // getTocen();
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
