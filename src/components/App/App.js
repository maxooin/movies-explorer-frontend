import Header from "../Header/Header";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import PrivateRouter from "../PrivateRoute/PrivateRouter";


function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [commonError, setCommonError] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [isButtonMoreDispayed, setIsButtonMoreDispayed] = useState(false);
  const [cardsForDisplay, setCardsForDisplay] = useState([]);
  // const [cardsFiltered, setCardsFiltered] = useState(moviesFromLocalStorage);
  const [savedCards, setSavedCards] = useState([]);
  const [savedCardsFiltered, setSavedCardsFiltered] = useState([]);
  const [savedCardsForDisplay, setSavedCardsForDisplay] = useState([]);

  /* const moviesFromLocalStorage = JSON.parse(localStorage.getItem("filteredCards")) || [];
   const textForSearchFromLocalStorage = localStorage.getItem("textForSearch") || false;
   const isShortFilmsFromLocalStorage = JSON.parse(localStorage.getItem("isShortFilms")) || false;*/

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = (data) => {
    setCommonError('');
    auth.signup(data)
      .then(() => {
        console.log(data)
        setMessage('');
        setIsSuccess(true);
        auth.signin({email: data.email, password: data.password})
          .then((item) => {
            if (item.token) {
              setLoggedIn(true)
              navigate('/movies')
            }
          })
      })
      .catch((err) => {
        const errMessage = err.message === 'Validation failed'
          ? 'При регистрации пользователя произошла ошибка.'
          : err.message;
        setCommonError(errMessage);
        setLoggedIn(false);
      })
  }

  const handleSignin = (data) => {
    setCommonError('');
    auth.signin(data)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/profile')
        }
      })
      .catch((err) => {
        const errMessage = err.message === 'Validation failed'
          ? 'При логине произошла ошибка.'
          : err.message;
        setCommonError(errMessage);
        setLoggedIn(false);
      })
  }

  const handleLogout = () => {
    auth.signout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          navigate('/');
          localStorage.clear();
        }
      })
      .catch((err) => {
        setMessage(`что-то пошло не так: ${err.message}`)
      })
  }

  const handleEditProfile = (data) => {
    setCommonError('');
    mainApi.updateUserInfo({name: data.name, email: data.email})
      .then((item) => {
        setMessage('');
        setCurrentUser(item)
      })
      .catch((err) => {
        if (err === 409) {
          setCommonError('Пользователь с таким email уже существует!')
        } else {
          setCommonError('При обновлении профиля произошла ошибка.')
        }
        setCurrentUser(currentUser);
      })
  }

  useEffect(() => {
    auth.checkToken()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.message !== 'Отсутствует авторизационный заголовок или cookies') {
          setMessage(err.message)
        }
        setLoggedIn(false)
      })
  }, [loggedIn])

  return (
    <>
      <CurrentUserContext.Provider value={{currentUser, commonError}}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/signup' element={<Register handleSignup={handleSignup} />} />
          <Route exact path='/signin' element={<Login handleSignin={handleSignin} />} />
          <Route exact path='/profile' element={<PrivateRouter loggedIn={loggedIn}
                                                               component={Profile}
                                                               handleEditProfile={handleEditProfile}
                                                               handleLogout={handleLogout} />} />
          <Route exact path='/movies' element={<Movies />} />
          <Route exact path='/saved-movies' element={<SavedMovies />} />
          <Route exact path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
