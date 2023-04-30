import { Outlet } from 'react-router-dom';
import Header from '../../componemts/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
