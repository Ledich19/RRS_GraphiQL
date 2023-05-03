import { Outlet } from 'react-router-dom';
import Header from '../../componemts/Header/Header';
import Footer from '../../componemts/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
