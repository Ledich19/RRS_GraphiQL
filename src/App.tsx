import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Spinner from './components/Spinner/Spinner';

const ErrorPage = lazy(() => import('./pages/Page404/Page404'));
const Editor = lazy(() => import('./pages/Editor/Editor'));
const Welcome = lazy(() => import('./pages/Welcome/Welcome'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Reset = lazy(() => import('./components/Reset/Reset'));

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="auth" element={<RegisterPage />}>
          <Route
            path="sign-in"
            element={
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="sign-up"
            element={
              <Suspense fallback={<Spinner />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="reset"
            element={
              <Suspense fallback={<Spinner />}>
                <Reset />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="editor"
          element={
            <Suspense fallback={<Spinner />}>
              <Editor />
            </Suspense>
          }
        />
        <Route
          path="404"
          element={
            <Suspense fallback={<Spinner />}>
              <ErrorPage />
            </Suspense>
          }
        />

        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  );
};

export default App;
