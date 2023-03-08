import React, {FC, useCallback, useEffect, useState} from 'react';
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

const App : FC = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
  const [ checkingLogIn, setCheckingLogIn ] = useState<boolean>(false);
  const {token, error, loading} = useTypedSelector(state => state.token);

  const { getUserInfo } = useActions()

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }, []);

  const cbTokenCheck = useCallback(async () => {
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      const user = await getUserInfo();
      if (user.name) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCheckingLogIn(true);
    }
  }, [token]);

  useEffect(() => {
    cbTokenCheck();
  }, [ cbTokenCheck ]);

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
        </Route>

      </Routes>
    </div>
  );
};

export default App;
