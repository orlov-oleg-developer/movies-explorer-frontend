import {Route, Switch, useHistory} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './App.css';

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

import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';
import moviesApi from "../../utils/MoviesApi";
import useSearch from "../../hooks/useSearch";

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ isMenuActive, setIsMenuActive ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const [ searchQuery, setSearchQuery ] = useState('');
  const [ toggleState, setToggleState ] = useState(false);

  const [ searchedMoviesWithOwner, setSearchedMoviesWithOwner ] = useState([]);

  const [ movies, setMovies ] = useState([]);
  const searchedMovies = useSearch(movies, searchQuery, toggleState);

  const [ savedMovies, setSavedMovies ] = useState([]);
  const searchedSavedMovies = useSearch(savedMovies, searchQuery, toggleState);

  const history = useHistory();

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
    if(window.innerWidth >= 1280) {
      setTotalCount(12);
    }
    else if(window.innerWidth >= 768) {
      setTotalCount(8);
    }
    else {
      setTotalCount(5);
    }
  }

  const handleMenuButtonCb = () => {
    setIsMenuActive(!isMenuActive);
  }

  const handleAddMoviesCountCb = () => {
    if(window.innerWidth >= 1280) {
      setTotalCount(totalCount + 3);
    }
    else if(window.innerWidth >= 768) {
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
        console.log(err);
      })
  }

  const handleUpdateUserInfo = (userData) => {
    mainApi.updateUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleMoviesSearchCb = (searchQuery, toggleState) => {
    setSearchQuery(searchQuery);
    setToggleState(toggleState);
  }

  const handleSavedMoviesSearchCb = (searchQuery, toggleState) => {
    setSearchQuery(searchQuery);
    setToggleState(toggleState);
  }

  const cbAuthenticate = useCallback(async (token) => {
    try {
      const data = await auth.getContent(token);
      if (!data) throw new Error('Неверный токен');
      localStorage.setItem('jwt', token);
      setIsLoggedIn(true);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  }, [])

  const cbRegister = useCallback(async ({ mailInput, passwordInput, nameInput }) => {
    try {
      const res = await auth.register({ mailInput, passwordInput, nameInput });
      if (res) {
        cbLogin({mailInput, passwordInput});
      }
    } catch (e) {
      setErrorMessage(e);
    }
  }, [])

  const cbLogin = useCallback(async ({ mailInput, passwordInput }) => {
    try {
      const token = await auth.authorize({ mailInput, passwordInput });
      if (token) {
        mainApi.updateToken(token.token);
        cbAuthenticate(token.token);
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      //TODO loading
    }
  }, [])

  const cbTokenCheck = useCallback(async () => {
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      cbAuthenticate(jwt);
    } catch (e) {
      console.log(e);
    }
    finally {
      //TODO loading
    }
  }, [cbAuthenticate]);

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    setSearchQuery('');
    setToggleState(false);
    setSavedMovies([]);
    setMovies([]);
    localStorage.removeItem('jwt');
    localStorage.removeItem('toggle');
    localStorage.removeItem('movieRequest');
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(true);
    moviesApi.getMovies()
    .then((moviesList) => {
        setMovies(moviesList);
      })
      .catch((err) => {
        console.log(err);
      })
    .finally(() => {
      setIsLoading(false);
    })
  }, [ isLoggedIn ]);

  useEffect(() => {
    mainApi.getMovies()
      .then((savedMovieList) => {
        if (currentUser._id === savedMovieList[0].owner._id) console.log(true)
        const filteredMovieList = savedMovieList.filter((savedMovie) => {
          return savedMovie.owner._id === currentUser._id
        })
        setSavedMovies(filteredMovieList);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  useEffect(() => {
    cbTokenCheck();
  }, [ cbTokenCheck ]);

  useEffect(() => {
    setSearchedMoviesWithOwner(() => addOwnerStatusToMovie(searchedMovies));
  }, [ searchedMovies, savedMovies ])

  useEffect(() => {
    updateTotalCount();

    window.addEventListener('resize', updateTotalCount);
    return () => window.removeEventListener('resize', updateTotalCount);
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route path="/signup">
            <Register onRegister={cbRegister} errorMessage={errorMessage}/>
          </Route>
          <Route path="/signin">
            <Login onLogin={cbLogin} errorMessage={errorMessage}/>
          </Route>
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
            component={Profile}
            handleLogout={cbLogout}
            handleUpdateUserInfo={handleUpdateUserInfo}

            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
