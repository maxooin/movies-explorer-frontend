import React from 'react';
import Form from "../Form/Form";
import { useFormAndValidation } from "../../hooks/useForm";
import { emailRegex } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Login = ({ handleSignin }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { commonError } = React.useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleSignin(values)
  }

  return (
    <>
      <Form title='Рады видеть!'
            textbtn='Войти'
            handleSubmit={ handleSubmit }
            isValid={ isValid }>
        <label className='login__label'>
          E-mail
          <input className='login__input'
                 id='email'
                 name='email'
                 type='email'
                 value={ values['email'] || '' }
                 onChange={ handleChange }
                 placeholder='Email'
                 pattern={ emailRegex }
                 required
          />
          <span className='login__error'>{ errors['email'] || '' }</span>
        </label>
        <label className='login__label'>
          Пароль
          <input className='register__input'
                 id='password'
                 name='password'
                 type='password'
                 minLength={ 3 }
                 maxLength={ 10 }
                 value={ values['password'] || '' }
                 onChange={ handleChange }
                 placeholder='Пароль'
                 required />
          <span className='login__error'>{ errors['password'] || '' }</span>
        </label>
        <span>{ commonError }</span>
      </Form>
    </>
  );
};

export default Login;
