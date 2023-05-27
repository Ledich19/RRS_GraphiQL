import { BallTriangle } from 'react-loader-spinner';
import s from './Spinner.module.scss';

const Spinner = () => {
  return (
    <BallTriangle
      height={50}
      width={50}
      radius={5}
      color="gold"
      ariaLabel="ball-triangle-loading"
      wrapperClass={s.spinner}
    />
  );
};

export default Spinner;
