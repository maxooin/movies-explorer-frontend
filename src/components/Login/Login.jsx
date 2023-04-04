import React, {useEffect} from 'react';
import Form from "../Form/Form";
import {useFormAndValidation} from "../../hooks/useForm";
import {emailRegex} from "../../utils/constants";
import {useNavigate} from "react-router-dom";

const Login = ({handleSignin, loggedIn}) => {
  const {values, handleChange, errors, isValid, setIsValid, setInitialState, initialState} = useFormAndValidation();

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setInitialState(true);
    setIsValid(false);
    handleSignin(values)
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  return (
    <>
      <Form title='Рады видеть!'
            textbtn='Войти'
            handleSubmit={handleSubmit}
            isValid={isValid}
            initialState={initialState}>
        <label className='login__label'>
          E-mail
          <input className='login__input'
                 id='email'
                 name='email'
                 type='email'
                 value={values['email'] || ''}
                 onChange={handleChange}
                 placeholder='Email'
                 pattern={emailRegex}
                 required
          />
          <span className='login__error'>{errors['email'] || ''}</span>
        </label>
        <label className='login__label'>
          Пароль
          <input className='register__input'
                 id='password'
                 name='password'
                 type='password'
                 minLength={3}
                 maxLength={10}
                 value={values['password'] || ''}
                 onChange={handleChange}
                 placeholder='Пароль'
                 required />
          <span className='login__error'>{errors['password'] || ''}</span>
        </label>
      </Form>
    </>
  );
};

export default Login;
