import { useState, useEffect } from 'react';
import { ValidationType } from '../app/types';

const useValidation = (value: string | undefined, validations: ValidationType) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(true);
    setError('');
    const validationKeys = Object.keys(validations);
    validationKeys.forEach((key) => {
      switch (key) {
        case 'reGex':
          if (value && validations[key]) {
            const isValidValue = validations[key]?.value?.test(value);
            if (!isValidValue) {
              setError(validations[key]?.text || '');
              setIsValid(false);
            }
          }
          break;
        case 'minLength':
          if (value && value.length < validations[key]) {
            setIsValid(false);
            setError(`должно быть больше ${validations[key]}`);
          }
          break;
        case 'isEmpty':
          if (!value) {
            setIsValid(false);
            setError(`Не должно быть пустым`);
          }
          break;
        default:
          break;
      }
    });
  }, [value, validations]);

  return {
    isValid,
    error,
  };
};
export default useValidation;
