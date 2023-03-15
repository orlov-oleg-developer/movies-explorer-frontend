import React, { FC, useCallback, useEffect, useState } from 'react';
import {Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import {useActions} from "../../hooks/useActions";
import Preloader from "../Preloader/Preloader";
import Register from "../Register/Register";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import TechsDigital from "../TechsDigital/TechsDigital";
import Movies from "../Movies/Movies";
import { SCREEN, TABLET } from '../../config/config'
import SavedMovies from "../SavedMovies/SavedMovies";

const App : FC = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
  const [ checkingLogIn, setCheckingLogIn ] = useState<boolean>(false);
  const [ totalCount, setTotalCount ] = useState<number>(0);

  const { getSavedMovies, getUserInfo, setToken } = useActions();

  const { token } = useTypedSelector(state => state.token);
  const { user, error, loading } = useTypedSelector(state => state.user);

  const updateTotalCount = () => {
    if(window.innerWidth >= SCREEN) {
      setTotalCount(12);
    }
    else if(window.innerWidth >= TABLET) {
      setTotalCount(8);
    }
    else {
      setTotalCount(5);
    }
  }

  const handleAddMoviesCountCb = () => {
    if(window.innerWidth >= SCREEN) {
      setTotalCount(totalCount + 3);
    }
    else if(window.innerWidth >= TABLET) {
      setTotalCount(totalCount + 2);
    }
    else {
      setTotalCount(totalCount + 2);
    }
  }

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('toggle');
    localStorage.removeItem('movieRequest');
  }, []);

  const cbTokenCheck = useCallback(async () => {
    console.log(`Чекаем токен`)
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        setCheckingLogIn(true);
        throw new Error('no token');
      }
      console.log(`Токен есть: ${jwt}`)
      getUserInfo(jwt);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    cbTokenCheck();
  }, [ cbTokenCheck, token ]);

  useEffect(() => {
    if (user?.name) {
      console.log(`Пользователь получен: ${user.name}`)
      setToken(token);
      setIsLoggedIn(true);
      setCheckingLogIn(true);
    } if (error) setCheckingLogIn(true);
  }, [ user ])

  useEffect(() => {
    if (!isLoggedIn) return
    getSavedMovies(token);
  }, [ token ]);

  useEffect(() => {
    updateTotalCount();

    window.addEventListener('resize', updateTotalCount);
    return () => window.removeEventListener('resize', updateTotalCount);
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
        <Route path="/digital" element={ <TechsDigital /> }/>

        <Route
          path="/signin"
          element={isLoggedIn? <Navigate to={'/'}/> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn? <Navigate to={'/'}/> : <Register />}
        />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
          <Route path='/profile' element={
            <>
              <Header
                className='App__header'
                isLoggedIn={isLoggedIn}
              />
              <Profile onLogout={cbLogout}/>
            </>
          }/>

          <Route path='/movies' element={
            <>
              <Header
                className='App__header'
                isLoggedIn={isLoggedIn}
              />
              <Movies isLoggedIn={isLoggedIn} totalCount={totalCount}/>
            </>
          }/>

          <Route path='/saved-movies' element={
            <>
              <Header
                className='App__header'
                isLoggedIn={isLoggedIn}
              />
              <SavedMovies isLoggedIn={isLoggedIn} totalCount={totalCount}/>
            </>
          }/>
        </Route>

      </Routes>
    </div>
  );
};

export default App;
