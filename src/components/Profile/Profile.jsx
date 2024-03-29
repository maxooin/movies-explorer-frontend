import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useFormAndValidation} from "../../hooks/useForm";

const Profile = ({handleEditProfile, handleLogout}) => {

  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const {currentUser, commonError} = useContext(CurrentUserContext)
  const {values, setValues, handleChange, errors, isValid, setIsValid} = useFormAndValidation();

  const textOnButton = isSubmitButton ? 'Сохранить' : 'Редактировать';

  function handleEditSaveButton(evt) {
    evt.preventDefault()
    if (isSubmitButton) {
      handleEditProfile(values)
      setIsSubmitButton(false)
      setIsDisabled(true)
    } else {
      setIsSubmitButton(true)
      setIsDisabled(false)
    }
  }


  useEffect(() => {
    setValues(currentUser)
    setIsValid(true)
  }, [currentUser, setValues, setIsValid])

  useEffect(() => {
    if (isSubmitButton) {
      const hasChanges = values.name !== currentUser.name || values.email !== currentUser.email;
      if (isValid && hasChanges) {
        setIsButtonDisabled(false)
      } else {
        setIsButtonDisabled(true)
      }
    } else {
      setIsButtonDisabled(false)
    }
  })

  return (
    <section className="profile">
      <h2 className='profile__title'>Привет, {currentUser.name}</h2>
      <form className="profile__form" onSubmit={handleEditSaveButton}>
        <fieldset className="profile__fieldset">
          <label className="profile__label">
            <span className="profile__span">Имя</span>
            <input
              className="profile__input"
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              value={values['name'] || ''}
              onChange={handleChange}
              disabled={isDisabled}
              placeholder="Имя"
              required />
            <span className="profile__error">{errors['name'] || ''}</span>
          </label>
          <label className="profile__label">
            <span className="profile__span">E-mail</span>
            <input
              className="profile__input"
              id="email"
              name="email"
              type="email"
              value={values['email'] || ''}
              onChange={handleChange}
              disabled={isDisabled}
              placeholder="email"
              required />
            <span className="profile__error">{errors['email'] || ''}</span>
          </label>
          <span className="profile__error">{commonError}</span>
          <button
            className="profile__button-submit"
            id="profile-submit"
            type="submit"
            disabled={isButtonDisabled}
          >
            {textOnButton}
          </button>
        </fieldset>
      </form>
      <button className="profile__button-exit" onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </section>
  );
};

export default Profile;
