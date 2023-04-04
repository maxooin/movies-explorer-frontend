import {useCallback, useState} from "react";


export const useFormAndValidation = () => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [initialState, setInitialState] = useState(false);

  const handleChange = (evt) => {

    const {value, name} = evt.target;

    setValues({...values, [name]: value});

    setErrors({...errors, [name]: evt.target.validationMessage});

    setIsValid(evt.target.closest('form').checkValidity())
    setInitialState(false)
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return {values, setValues, handleChange, errors, isValid, setIsValid, resetForm, setInitialState, initialState};
}
