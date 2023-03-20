import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

const loggedIn = true;


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
        <Route path='*' element={ <><h1>Not Found</h1></> } />
      </Routes>
    </>
  );
}

export default App;
