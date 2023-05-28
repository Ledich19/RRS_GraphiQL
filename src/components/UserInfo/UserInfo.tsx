import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db } from '../../app/firebase';
import s from './UserInfo.module.scss';
import useSetNotify from '../../hooks/useSetNotify';

const UserInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const notify = useSetNotify(5000);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const { t } = useTranslation();

  useEffect(() => {
    if (loading) return;
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        notify({ type: '', text: '' });
      }
    };
    fetchUserName();
  }, [user, loading, navigate, notify]);

  return (
    <div className={s.userInfo}>
      {user && !error ? (
        <div>
          {t('loggedInAs')}
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
