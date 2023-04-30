import s from './Page404.module.scss';

const ErrorPage = () => {
  return (
    <div className={s.error}>
      <h1>404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export default ErrorPage;
