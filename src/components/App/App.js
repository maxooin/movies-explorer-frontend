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
import {quantityMoviesToMount, searchMovies, shortFilter} from "../../utils/constants";
import moviesApi from "../../utils/MoviesApi";


function App() {

  const moviesFromLocalStorage = JSON.parse(localStorage.getItem("filteredCards")) || [];
  const textForSearchFromLocalStorage = localStorage.getItem("textForSearch") || false;
  const isShortMoviesFromLocalStorage = JSON.parse(localStorage.getItem("isShortMovies")) || false;

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [commonError, setCommonError] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [isButtonMoreDisplayed, setIsButtonMoreDisplayed] = useState(false);
  const [cardsForDisplay, setCardsForDisplay] = useState([]);
  const [cardsFiltered, setCardsFiltered] = useState(moviesFromLocalStorage);
  const [savedCards, setSavedCards] = useState([]);
  const [savedCardsFiltered, setSavedCardsFiltered] = useState([]);
  const [savedCardsForDisplay, setSavedCardsForDisplay] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();

  const isLocationMovies = location.pathname === '/movies';

  let timeOutFunctionId;

  const handleSignup = (data) => {
    setCommonError('');
    auth.signup(data)
      .then(() => {
        setCommonError('');
        auth.signin({email: data.email, password: data.password})
          .then((res) => {
            if (res) {
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
          navigate('/movies')
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
        setCommonError(`что-то пошло не так: ${err.message}`)
      })
  }

  const handleEditProfile = (data) => {
    setCommonError('');
    mainApi.updateUserInfo({name: data.name, email: data.email})
      .then((item) => {
        setCommonError('');
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
  const chooseMovies = (cardsMovies, searchText) => {
    const filteredCards = searchMovies(cardsMovies, searchText);
    setCardsFiltered(filteredCards);

    const shortFilteredCards = shortFilter(filteredCards, isShortMovies);
    setCardsForDisplay(shortFilteredCards.slice(0, quantityMoviesToMount(width).cards));

    if (shortFilteredCards.length > 0) {
      setIsButtonMoreDisplayed(shortFilteredCards.length > shortFilteredCards.slice(0, quantityMoviesToMount(width).cards).length);
    } else {
      setIsButtonMoreDisplayed(false)
    }

    localStorage.setItem('textForSearch', searchText);
    localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
    localStorage.setItem('isShortMovies', isShortMovies)
  }

  const handleSearchMovies = (searchText) => {
    if (isFirstSearch) {
      setIsLoading(true);
      setIsFailed(false);
      moviesApi.getMoviesCards()
        .then((data) =>
          Promise.all(moviesApi.filterCards(data))
        )
        .then((res) => {
          setCards(res);
          chooseMovies(res, searchText);
          setIsFirstSearch(false);
        })
        .catch(() => {
          setIsFailed(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(true);
      chooseMovies(cards, searchText);
      setIsLoading(false);
    }
  }

  const handleSearchSavedMovies = (searchText) => {
    setIsLoading(true);
    const filteredCards = searchMovies(savedCards, searchText);
    setSavedCardsFiltered(filteredCards);

    const shortFilteredCards = shortFilter(filteredCards, isShortMovies);
    setSavedCardsForDisplay(shortFilteredCards);

    setIsLoading(false);
  }

  const handleShortMovies = () => {
    if (isLocationMovies) {
      const cardsResult = shortFilter(cardsFiltered, !isShortMovies);
      setCardsForDisplay(cardsResult.slice(0, quantityMoviesToMount(width).cards));
      if (cardsResult.length > 0) {
        setIsButtonMoreDisplayed(cardsResult.length > cardsResult.slice(0, quantityMoviesToMount(width).cards).length);
      } else {
        setIsButtonMoreDisplayed(false)
      }
      localStorage.setItem('isShortMovies', !isShortMovies);
    } else {
      const shortFilteredCards = shortFilter(savedCardsFiltered, !isShortMovies);
      setSavedCardsForDisplay(shortFilteredCards)
    }
  }

  const handleSaveMovies = (cardSave) => {
    mainApi.saveMoviesCard(cardSave)
      .then((newCard) => {
        setSavedCards([...savedCards, newCard]);
      })
      .catch((err) => {
        if (err === 401) {
          setLoggedIn(false);
          setCurrentUser({});
          localStorage.clear();
        }
      })
  }

  const handleDeleteMovies = (deleteCard) => {
    const cardDelete = savedCards.filter((item) => item.movieId === deleteCard.movieId && item.owner === currentUser._id)

    cardDelete.forEach((res) => {
      mainApi.deleteMoviesCard(res._id)
        .then(() => {
          setSavedCards(savedCards.filter((item) => item._id !== res._id));
        })
        .catch((err) => {
          if (err === 401) {
            setLoggedIn(false);
            setCurrentUser({});
            localStorage.clear();
          }
        })
    })
  }

  const handleButtonMore = () => {
    const cardsQuantity = cardsForDisplay.length + quantityMoviesToMount(width).more;
    const cardsResult = shortFilter(cardsFiltered, isShortMovies);

    if (cardsResult.length > cardsForDisplay.length) {
      setCardsForDisplay(cardsResult.slice(0, cardsQuantity));
    }

    if (cardsQuantity >= cardsResult.length) {
      setIsButtonMoreDisplayed(false);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      mainApi.getMoviesCards()
        .then((cardsData) => {
          setSavedCards(() => cardsData);
          setSavedCardsFiltered(cardsData);
          setSavedCardsForDisplay(cardsData)
        })
        .catch((err) => {
          setCommonError(`При загрузке сохранённых карточек с сервера произошла ошибка: ${err.message}`)
        });

      if (isLocationMovies) {
        setIsShortMovies(isShortMoviesFromLocalStorage)
        setCardsForDisplay(() =>
          textForSearchFromLocalStorage
            ? shortFilter(moviesFromLocalStorage, isShortMoviesFromLocalStorage).slice(0, quantityMoviesToMount(width).cards) : [])
        if (moviesFromLocalStorage.length > quantityMoviesToMount(width).cards) {
          setIsButtonMoreDisplayed(true);
        } else {
          setIsButtonMoreDisplayed(false);
        }
      } else {
        setIsShortMovies(false);
      }
      setCommonError('')
    }
  }, [location])

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
          setCommonError(err.message)
        }
        setLoggedIn(false)
      })
  }, [loggedIn])

  useEffect(() => {
    const handleResize = (evt) => {
      clearTimeout(timeOutFunctionId);
      timeOutFunctionId = setTimeout(() => {
        setWidth(evt.target.innerWidth);
      }, 300);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

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
          <Route exact path='/movies' element={<PrivateRouter loggedIn={loggedIn}
                                                              component={Movies}
                                                              isLoading={isLoading}
                                                              isFailed={isFailed}
                                                              cards={cardsForDisplay}
                                                              isButtonMoreDisplayed={isButtonMoreDisplayed}
                                                              handleButtonMoreClick={handleButtonMore}
                                                              isShortMovies={isShortMovies}
                                                              setIsShortMovies={setIsShortMovies}
                                                              handleShortMovies={handleShortMovies}
                                                              handleDeleteMovies={handleDeleteMovies}
                                                              handleSaveMovies={handleSaveMovies}
                                                              handleSearchMovies={handleSearchMovies}
                                                              savedTextForSearch={textForSearchFromLocalStorage}
                                                              savedCards={savedCards} />} />
          <Route exact path='/saved-movies' element={<PrivateRouter loggedIn={loggedIn}
                                                                    component={SavedMovies}
                                                                    isLoading={isLoading}
                                                                    isFailed={isFailed}
                                                                    cards={savedCardsForDisplay}
                                                                    isShortMovies={isShortMovies}
                                                                    setIsShortMovies={setIsShortMovies}
                                                                    handleShortMovies={handleShortMovies}
                                                                    handleDeleteMovies={handleDeleteMovies}
                                                                    handleSearchSavedMovies={handleSearchSavedMovies}
                                                                    savedCards={savedCards} />} />
          <Route exact path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
