import './App.css';

import React, { FC, useCallback, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { updateTotalCount } from './utils';
import { setUser } from '../../store/action-creators/user';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import TechsDigital from "../TechsDigital/TechsDigital";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Preloader from "../Preloader/Preloader";

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingLogIn, setCheckingLogIn] = useState<boolean>(false);

  const { getSavedMovies, getUserInfo, setToken, setCardsTotalCount } = useActions();

  const { token } = useTypedSelector(state => state.token);
  const { user, error, loading } = useTypedSelector(state => state.user);

  const updateTotalCountcb = updateTotalCount(setCardsTotalCount)

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    setToken('')
    setUser({
      email: '',
      name: '',
    });
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('toggle');
    localStorage.removeItem('movieRequest');
    localStorage.removeItem('isFirstRequest');
  }, []);

  const cbTokenCheck = useCallback(async () => {
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        setCheckingLogIn(true);
        throw new Error('no token');
      }
      setToken(jwt);
      getUserInfo(jwt);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck, token]);

  useEffect(() => {
    if (user?.name) {
      setIsLoggedIn(true);
      setCheckingLogIn(true);
    } if (error) setCheckingLogIn(true);
  }, [user, error])

  useEffect(() => {
    if (!token || !user?.name) return
    getSavedMovies(token, user);
  }, [token, user]);

  useEffect(() => {
    updateTotalCountcb();

    window.addEventListener('resize', updateTotalCountcb);
    return () => window.removeEventListener('resize', updateTotalCountcb);
  }, [])

  if (!checkingLogIn) return <Preloader />

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
        <Route path="/digital" element={<TechsDigital />} />

        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to={'/'} /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to={'/'} /> : <Register />}
        />

        <Route path='/movies' element={
          <>
            <Header
              className='App__header'
              isLoggedIn={isLoggedIn}
            />
            <Movies />
          </>
        } />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
          <Route path='/profile' element={
            <>
              <Header
                className='App__header'
                isLoggedIn={isLoggedIn}
              />
              <Profile onLogout={cbLogout} />
            </>
          } />

          <Route path='/saved-movies' element={
            <>
              <Header
                className='App__header'
                isLoggedIn={isLoggedIn}
              />
              <SavedMovies
                isLoggedIn={isLoggedIn}
              />
            </>
          } />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
