import React, { useState, ChangeEvent } from 'react';

type TInputValues = {
  [key: string]: string;
}

export function useForm(inputValues: TInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };
  return { values, setValues, handleChange };
}
