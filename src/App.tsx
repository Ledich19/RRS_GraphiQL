import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import ErrorPage from './pages/Page404/Page404';
import Layout from './pages/Layout/Layout';
import AboutUs from './pages/AboutUs/AboutUs';
import Editor from './pages/Editor/Editor';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<AboutUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="editor" element={<Editor />} />
        <Route path="404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  );
};

export default App;
