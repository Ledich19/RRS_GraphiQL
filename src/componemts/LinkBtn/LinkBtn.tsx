import { Link } from 'react-router-dom';

type PropsType = {
  to: string;
  name: string;
  className: string;
};

const LinkBtn = ({ to, name, className }: PropsType) => {
  return (
    <Link to={to}>
      <button type="button" className={className}>
        {name}
      </button>
    </Link>
  );
};

export default LinkBtn;
