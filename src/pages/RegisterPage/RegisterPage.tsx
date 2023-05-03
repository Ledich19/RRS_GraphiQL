import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import './RegisterPage.module.scss';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db, logout } from '../../firebase';
import LogoutBtn from '../../componemts/AuthorizationBlock/LogoutBtn/LogoutBtn';

const RegisterPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      //navigate('/');
      return;
    }
    fetchUserName();
  }, [user, loading, fetchUserName, navigate]);
  
  return (
    <div className="RegisterPage">
      <div className="RegisterPage__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
      </div>
      <Outlet />
    </div>
  );
};
export default RegisterPage;
