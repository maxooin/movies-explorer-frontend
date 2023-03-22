import Header from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";


function App() {

  const [currentUser, setCurrentUser] = useState({
    name: 'Михаил',
    _id: 5,
    email: 'm@test.ru'
  });
  const [loggedIn, setLoggedIn] = useState(true);
  const [commonError, setCommonError] = useState('')


  function handleSubmitProfile(
    setIsSubmitButton,
    setIsDisabled,
    isChanged,
    values,
  ) {
    if (isChanged) {
      currentUser.name = values.name
      currentUser.email = values.email
      setCommonError('При обновлении профиля произошла ошибка.')
    }
    setIsSubmitButton(false)
    setIsDisabled(true)
  }


  return (
    <>
      <CurrentUserContext.Provider value={ { currentUser, commonError } }>
        <Header loggedIn={ loggedIn } />
        <Routes>
          <Route exact path='/' element={ <Main /> } />
          <Route exact path='/profile' element={ <Profile handleSubmitProfile={ handleSubmitProfile } /> } />
          <Route exact path='/signup' element={ <Register /> } />
          <Route exact path='/signin' element={ <Login /> } />
          <Route exact path='/movies' element={ <Movies /> } />
          <Route exact path='/saved-movies' element={ <SavedMovies /> } />
          <Route exact path="/not-found" element={ <NotFound /> } />
          <Route path="*" element={ <Navigate to="/not-found" replace /> } />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
