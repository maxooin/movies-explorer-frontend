import ok_icon from '../../images/ok_icon.svg'
import {useEffect} from "react";

const Toast = ({isToastVisible, setIsToastVisible, message}) => {


  useEffect(() => {
    setTimeout(() => {
      if (isToastVisible) {
        setIsToastVisible(false);
      }
    }, 3000)
  }, [isToastVisible])

  return (
    <div className={`toast ${isToastVisible ? 'toast_visible' : ''}`}>
      <div className='toast__container'>
        <img className='toast__icon' src={ok_icon} alt='' />
        <div className='toast__text-container'>
          <h3 className='toast__title'>{message.title}</h3>
          <p className='toast__text'>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
