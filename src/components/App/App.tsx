import React, {FC, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

const App : FC = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

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
      </Routes>
    </div>
  );
};

export default App;
