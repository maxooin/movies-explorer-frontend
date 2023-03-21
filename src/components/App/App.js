import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";

const loggedIn = false;


function App() {
  return (
    <>
      <Routes>
        <Route path='' element={
          <div>
            <Header loggedIn={ loggedIn } />
            <Routes>
              <Route path='/' element={ <Main /> } />
            </Routes>
            <Footer />
          </div>
        } />
        <Route path='*' element={ <NotFound /> } />
        <Route path='/signup' element={ <Register /> } />
        <Route path='/signin' element={ <Login /> } />
      </Routes>
    </>
  );
}

export default App;
