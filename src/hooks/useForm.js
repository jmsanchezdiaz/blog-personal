import { useState } from 'react';

export const useForm = (initState) => {
  const [formValues, setFormValues] = useState(initState);

  const resetForm = () => setFormValues(initState);

  const handleChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  return { ...formValues, formValues, resetForm, handleChange };
};
