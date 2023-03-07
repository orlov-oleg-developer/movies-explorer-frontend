import React, {FC, useCallback, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";

const App : FC = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(true);

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    // localStorage.removeItem('jwt');
  }, []);

  return (
    <div className="App">
      <Routes>

        <Route path="/"
          element={
          <>
            <Header
              className='App__header'
              isLoggedIn={isLoggedIn}
            />
            <Main />
            <Footer />
          </>
        }
        />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
          <Route path='/profile' element={<Profile onLogout={cbLogout}/>}/>
        </Route>

      </Routes>
    </div>
  );
};

export default App;
