import { decodeToken } from 'react-jwt';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db, logout } from '../../app/firebase';
import s from './UserInfo.module.scss';
import useSetNotify from '../../hooks/useSetNotify';

const UserInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const notify = useSetNotify(5000);
  const navigate = useNavigate();
  interface DecodedToken {
    exp: number;
  }

  useEffect(() => {
    let timeoutID: NodeJS.Timer;

    const getToken = async () => {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        const { exp } = decodeToken(token) as DecodedToken;
        timeoutID = setInterval(() => {
          if (Math.floor(Date.now() / 1000) >= exp) {
            logout();
            navigate('/');
          }
        }, 5000);
      }
    };
    getToken();

    return () => {
      window.clearTimeout(timeoutID);
    };
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading) return;
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        // notify({ type: 'error', text: 'An error occured while fetching user data' });
      }
    };
    fetchUserName();
  }, [user, loading, navigate, notify]);

  return (
    <div className={s.userInfo}>
      {user && !error ? (
        <div>
          Logged in as
          <div className={s.name}>{name}</div>
          <div className={s.email}>{user?.email}</div>
        </div>
      ) : (
        <div className={s.error}>{error?.message ? error.message : ''}</div>
      )}
    </div>
  );
};

export default UserInfo;
