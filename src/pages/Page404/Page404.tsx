import s from './Page404.module.scss';

const ErrorPage = () => {
  return (
    <div className={s.error}>
      <div className={s.box}>
        <h1 className={s.title}>404</h1>
        <p className={s.text}>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
