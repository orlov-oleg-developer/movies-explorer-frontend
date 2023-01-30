import {Route, Switch} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

import { movies, savedMovies } from "../../data/constants"
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleMenuButtonCb = () => {
    setIsMenuActive(!isMenuActive)
  }

  return (
    <div className="App">
      <Switch>
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
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/movies">
          <Header
            className="App__header"
            isLoggedIn={isLoggedIn}
            registerLink={"sign-up"}
            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <Movies moviesList={movies}/>
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header
            className="App__header"
            isLoggedIn={isLoggedIn}
            registerLink={"sign-up"}
            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <SavedMovies savedMoviesList={savedMovies}/>
          <Footer />
        </Route>
        <Route path="/profile">
          <Header
            className="App__header"
            isLoggedIn={isLoggedIn}
            registerLink={"sign-up"}
            isMenuActive={isMenuActive}
            handleMenuButton={handleMenuButtonCb}
          />
          <Profile />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
