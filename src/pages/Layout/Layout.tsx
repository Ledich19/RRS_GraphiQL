import { Outlet } from 'react-router-dom';
import Header from '../../componemts/Header/Header';
import Footer from '../../componemts/Footer/Footer';
import NotifyComponent from '../../componemts/NotifyComponent/NotifyComponent';

const Layout = () => {
  return (
    <>
      <Header />
      <NotifyComponent />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
