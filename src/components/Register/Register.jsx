import React from 'react';
import Form from "../Form/Form";
import {useFormAndValidation} from "../../hooks/useForm";
import {emailRegex, nameRegex} from "../../utils/constants";

const Register = ({handleSignup}) => {
  const {values, handleChange, errors, isValid} = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleSignup(values)
  }

  return (
    <>
      <Form title='Добро пожаловать!'
            textbtn='Зарегистрироваться'
            handleSubmit={handleSubmit}
            isValid={isValid}>
        <label className='register__label'>
          Имя
          <input className='register__input'
                 id='name'
                 name='name'
                 type='text'
                 minLength={2}
                 maxLength={30}
                 value={values['name'] || ''}
                 onChange={handleChange}
                 placeholder='Имя'
                 pattern={nameRegex}
                 required />
          <span className='register__error'>{errors['name'] || ''}</span>
        </label>
        <label className='register__label'>
          E-mail
          <input className='register__input'
                 id='email'
                 name='email'
                 type='email'
                 value={values['email'] || ''}
                 onChange={handleChange}
                 placeholder='Email'
                 pattern={emailRegex}
                 required
          />
          <span className='register__error'>{errors['email'] || ''}</span>
        </label>
        <label className='register__label'>
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
          <span className='register__error'>{errors['password'] || ''}</span>
        </label>
      </Form>
    </>
  );
};

export default Register;
