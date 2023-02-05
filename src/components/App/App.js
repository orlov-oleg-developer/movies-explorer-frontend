import {Route, Switch, useHistory} from 'react-router-dom';
import {useCallback, useEffect, useMemo, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
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

import api from '../../utils/Api.js'
import * as auth from '../../utils/auth.js'
import moviesApi from "../../utils/MoviesApi";

import { savedMovies } from "../../data/constants"

function App() {

  const [ isMenuActive, setIsMenuActive ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ toggleState, setToggleState] = useState(false);
  const [ totalCount, setTotalCount ] = useState(0);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [ errorMessage, setErrorMessage ] = useState(null);

  const history = useHistory();

  const searchedMovies = useMemo(() => {
    const moviesList = movies.filter(movie => movie.nameRU.includes(searchQuery));

    if (toggleState) {
      return moviesList.filter((movie) => {
        return (movie.duration <= 40)
      })
    }

    return moviesList;
  }, [searchQuery, movies, toggleState])

  const handleMenuButtonCb = () => {
    setIsMenuActive(!isMenuActive)
  }

  const handleMoviesSearchCb = (searchQuery) => {
    setIsLoading(true);

     moviesApi.getMovies()
      .then((moviesList) => {
        setSearchQuery(searchQuery);
        setMovies(moviesList);
        if(window.innerWidth >= 1280) {
          setTotalCount(12)
        }
        else if(window.innerWidth >= 768) {
          setTotalCount(8)
        }
        else {
          setTotalCount(5)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleAddMoviesCountCb = () => {
    console.log(`Количество карточек до ${totalCount}`)

    if(window.innerWidth >= 1280) {
      setTotalCount(totalCount + 3)
    }
    else if(window.innerWidth >= 768) {
      setTotalCount(totalCount + 2)
    }
    else {
      setTotalCount(totalCount + 2)
    }

    console.log(`Количество карточек после ${totalCount}`)
  }

  const cbAuthenticate = useCallback(async (token) => {
    try {
      const data = await auth.getContent(token);
      if (!data) throw new Error('Неверный токен');
      localStorage.setItem('jwt', token);
      // setUserData(data.email);
      setIsLoggedIn(true);
      history.push('/movies')
    } catch (e) {
      console.log(e);
    }
  }, [])

  const cbRegister = useCallback(async ({ mailInput, passwordInput, nameInput }) => {
    try {
      const res = await auth.register({ mailInput, passwordInput, nameInput });
      if (res) {
        setIsSuccessRegister(true);
        api.updateToken(res.token);
        cbAuthenticate(res.token);
      }
    } catch (e) {
      setIsSuccessRegister(false);
      setErrorMessage(e);
    }
    setIsInfoPopupOpen(true);
  }, [])

  const cbLogin = useCallback(async ({ mailInput, passwordInput }) => {
    try {
      const token = await auth.authorize({ mailInput, passwordInput });
      if (token) {
        api.updateToken(token.token);
        cbAuthenticate(token.token);
      }
    } catch (e) {
      setIsSuccessRegister(false);
      setIsInfoPopupOpen(true);
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
      console.log(e)
    }
    finally {
      //TODO loading
    }
  }, [cbAuthenticate]);

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }, []);

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

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
              registerLink={"sign-up"}
              isMenuActive={isMenuActive}
              handleMenuButton={handleMenuButtonCb}
            />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            handleMoviesSearchCb={handleMoviesSearchCb}
            moviesList={searchedMovies}
            isLoading={isLoading}
            totalCount={totalCount}
            handleAddMoviesCountCb={handleAddMoviesCountCb}
            toggleState={toggleState}
            setToggleStateCb={setToggleState}

            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            savedMoviesList={savedMovies}

            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            cbLogout={cbLogout}

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
