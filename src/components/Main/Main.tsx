import { Outlet } from 'react-router-dom';
import NotifyComponent from '../NotifyComponent/NotifyComponent';
import './Main.scss';

const Main = () => {
  return (
    <main className="main">
      <NotifyComponent />
      <Outlet />
    </main>
  );
};

export default Main;
