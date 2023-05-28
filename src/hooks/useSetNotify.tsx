import { useAppDispatch } from '../app/hooks';
import { setNotify } from '../reducers/notifyReducer';

const useSetNotify = (time: number) => {
  const dispatch = useAppDispatch();
  const setTime = (notify: { type: string; text: string }) => {
    dispatch(setNotify(notify));
    setTimeout(() => {
      dispatch(setNotify(null));
    }, time);
  };
  return setTime;
};
export default useSetNotify;
