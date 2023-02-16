import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import useSearch from "../../hooks/useSearch";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import AttentionPopup from "../AttentionPopup/AttentionPopup";

import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';
import moviesApi from "../../utils/MoviesApi";
import { SCREEN, TABLET } from "../../config/config";

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ checkingLogIn, setCheckingLogIn ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ isMenuActive, setIsMenuActive ] = useState(false);
  const [ isAttentionPopupOpened, setIsAttentionPopupOpened ] = useState(false);
  const [ isFirstRequest, setIsFirstRequest ] = useState(true);

  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ profileErrorMessage, setProfileErrorMessage ] = useState(null);
  const [ attentionMessage, setAttentionMessage ] = useState(null);

  const [ searchedMoviesWithOwner, setSearchedMoviesWithOwner ] = useState([]);

  const [ movies, setMovies ] = useState([]);
  const [ moviesSearchQuery, setMoviesSearchQuery ] = useState('');
  const [ moviesToggleState, setMoviesToggleState ] = useState(false);
  const searchedMovies = useSearch(movies, moviesSearchQuery, moviesToggleState);

  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ savedMoviesSearchQuery, setSavedMoviesSearchQuery ] = useState('');
  const [ savedMoviesToggleState, setSavedMoviesToggleState ] = useState(false);
  const searchedSavedMovies = useSearch(savedMovies, savedMoviesSearchQuery, savedMoviesToggleState);

  const addOwnerStatusToMovie = (moviesList) => {
    return moviesList.map((movie) => {
      let ownerStatus = false;

      for (let savedMovieIndex = 0; savedMovieIndex < savedMovies.length; savedMovieIndex++) {
        if (String(savedMovies[savedMovieIndex].movieId)  === String(movie.id)) {
          ownerStatus = true;
          movie._id = savedMovies[savedMovieIndex]._id;
          break;
        }
      }
      return (ownerStatus ? {...movie, owner: true} : {...movie, owner: false});
    })
  }

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

  const handleMenuButtonCb = () => {
    setIsMenuActive(!isMenuActive);
  }

  const handleCloseAttentionPopup = () => {
    setIsAttentionPopupOpened(false);
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

  const handleLikeMovieCb = (movieData) => {
    mainApi.createMovie(movieData)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => {
        return err.json();
      })
      .then((err) => {
        setAttentionMessage(err.message);
        setIsAttentionPopupOpened(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDeleteMovieCb = (movie) => {
    mainApi.deleteMovie(movie)
      .then((movie) => {
        setSavedMovies(
          (savedMovies) => savedMovies.filter((savedMovie) => savedMovie.movieId !== movie.movieId));
      })
      .catch((err) => {
        return err.json();
      })
      .then((err) => {
        setAttentionMessage(err.message);
        setIsAttentionPopupOpened(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleUpdateUserInfo = (userData) => {
    setIsLoading(true);
    mainApi.updateUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setAttentionMessage("Данные пользователя изменены");
        setIsAttentionPopupOpened(true);
      })
      .catch((err) => {
        return err.json();
      })
      .then((err) => {
        setProfileErrorMessage(err.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleMoviesSearchCb = (searchQuery, toggleState) => {
    if (isFirstRequest) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((moviesList) => {
          setMovies(moviesList);
          setIsFirstRequest(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
      return;
    } else {
      setMoviesSearchQuery(searchQuery);
      setMoviesToggleState(toggleState);
    }
  }

  const handleSavedMoviesSearchCb = (searchQuery, toggleState) => {
    setSavedMoviesSearchQuery(searchQuery);
    setSavedMoviesToggleState(toggleState);
  }

  const cbAuthenticate = useCallback(async (token) => {
    try {
      const data = await auth.getContent(token);
      if (!data) {
        throw new Error('Неверный токен');
      }
      localStorage.setItem('jwt', token);
      setIsLoggedIn(true);
    } catch (e) {
      const error = await e.json();
      console.log(error);
    }
    finally {
      setCheckingLogIn(true);
    }
  }, [])

  const cbRegister = useCallback(async ({ mailInput, passwordInput, nameInput }) => {
    try {
      setIsLoading(true);
      const res = await auth.register({ mailInput, passwordInput, nameInput });
      if (res) {
        cbLogin({mailInput, passwordInput});
        setErrorMessage(null);
      }
    } catch (e) {
      const error = await e.json();
      setErrorMessage(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }, [])

  const cbLogin = useCallback(async ({ mailInput, passwordInput }) => {
    try {
      setIsLoading(true);
      const token = await auth.authorize({ mailInput, passwordInput });
      if (token) {
        mainApi.updateToken(token.token);
        cbAuthenticate(token.token);
        setErrorMessage(null);
      }
    } catch (e) {
      const error = await e.json();
      setErrorMessage(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }, [])

  const cbTokenCheck = useCallback(async () => {
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        setCheckingLogIn(true);
        throw new Error('no token');
      }
      cbAuthenticate(jwt);
    } catch (e) {
      console.log(e);
    }
  }, [cbAuthenticate]);

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    setMoviesSearchQuery('');
    setSavedMoviesSearchQuery('');
    setMoviesToggleState(false);
    setSavedMoviesToggleState(false);
    setSavedMovies([]);
    setMovies([]);
    localStorage.removeItem('jwt');
    localStorage.removeItem('toggle');
    localStorage.removeItem('movieRequest');
  }, []);

  useEffect(() => {
    cbTokenCheck();
  }, [ cbTokenCheck ]);

  useEffect(() => {
    if (!isLoggedIn) return
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ isLoggedIn ]);

  useEffect(() => {
    mainApi.getMovies()
      .then((savedMovieList) => {
          const filteredMovieList = savedMovieList.filter((savedMovie) => {
          return savedMovie.owner._id === currentUser._id;
        })
        setSavedMovies(filteredMovieList);
      })
      .catch((err) => console.log(err));
  }, [ currentUser ]);

  useEffect(() => {
    const query = localStorage.getItem('movieRequest');
    const toggleState = JSON.parse(localStorage.getItem('toggle'));
    if (query) setMoviesSearchQuery(query);
    if (toggleState) setMoviesToggleState(toggleState);
  }, [ movies ])

  useEffect(() => {
    setSearchedMoviesWithOwner(() => addOwnerStatusToMovie(searchedMovies));
  }, [ searchedMovies, savedMovies ])

  useEffect(() => {
    updateTotalCount();

    window.addEventListener('resize', updateTotalCount);
    return () => window.removeEventListener('resize', updateTotalCount);
  }, [])

  if (!checkingLogIn) return <Preloader />

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <AttentionPopup
          onCloseButton={handleCloseAttentionPopup}
          isOpen={isAttentionPopupOpened}
          message={attentionMessage}
        />
        <Switch>
          <Route exact path="/">
            <Header
              className="App__header"
              isLoggedIn={isLoggedIn}
              isMenuActive={isMenuActive}
              handleMenuButton={handleMenuButtonCb}
            />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            handleMoviesSearchCb={handleMoviesSearchCb}
            handleAddMoviesCountCb={handleAddMoviesCountCb}
            handleLikeMovie={handleLikeMovieCb}
            handleDeleteMovie={handleDeleteMovieCb}
            moviesList={searchedMoviesWithOwner}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            totalCount={totalCount}
            errorMessage={errorMessage}

            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
            isFirstRequest={isFirstRequest}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            handleMoviesSearchCb={handleSavedMoviesSearchCb}
            handleAddMoviesCountCb={handleAddMoviesCountCb}
            handleDeleteMovie={handleDeleteMovieCb}
            savedMoviesList={searchedSavedMovies}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            totalCount={totalCount}
            errorMessage={errorMessage}

            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            component={Profile}
            handleLogout={cbLogout}
            handleUpdateUserInfo={handleUpdateUserInfo}
            errorMessage={profileErrorMessage}

            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <Route path="/signup">
            {isLoggedIn ? <Redirect to="./movies" /> : <Register onRegister={cbRegister} errorMessage={errorMessage} isLoading={isLoading}/>}
          </Route>
          <Route path="/signin">
            {isLoggedIn ? <Redirect to="./movies" /> : <Login onLogin={cbLogin} errorMessage={errorMessage} isLoading={isLoading}/>}
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
