import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db, logout } from '../../firebase';
import s from './UserInfo.module.scss';

const UserInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        alert('An error occured while fetching user data');
      }
    };
    fetchUserName();
  }, [user, loading, navigate]);

  return (
    <div className={s.userInfo}>
      Logged in as
      <div className={s.name}>{name}</div>
      <div className={s.email}>{user?.email}</div>
    </div>
  );
};

export default UserInfo;
