import { useState } from 'react';

export const useInput = (initValue: string, validator?: (input: string) => boolean) => {
  const [value, setValue] = useState(initValue);
  const [isValidate, setIsValidate] = useState(true);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    if (validator) {
      validateValue(currentValue);
    }
    setValue(currentValue);
  };

  const validateValue = (input: string) => {
    if (validator!(input)) {
      setIsValidate(true);
      return;
    }
    setIsValidate(false);
    return;
  };

  return { value, handleInput, isValidate };
};
