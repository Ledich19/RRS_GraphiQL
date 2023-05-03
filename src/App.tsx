import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import ErrorPage from './pages/Page404/Page404';
import Layout from './pages/Layout/Layout';
import AboutUs from './pages/AboutUs/AboutUs';
import Welcome from './pages/Welcome/Welcome';
import Login from './componemts/Login/Login';
import Register from './componemts/Register/Register';
import Reset from './componemts/Reset/Reset';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="auth" element={<RegisterPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
        </Route>
        <Route path="about" element={<AboutUs />} />
        {/* <Route path="404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="404" />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
