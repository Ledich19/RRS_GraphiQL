import { Outlet } from 'react-router-dom';
import NotifyComponent from '../../componemts/NotifyComponent/NotifyComponent';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
