import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ProtectedRoute = ({ component: Component, isLoggedIn, path, handleMenuButton, ...props }) => {
  return (
    <Route>
      <Header
        className="App__header"
        isLoggedIn={isLoggedIn}
        isMenuActive={props.isMenuActive}
        handleMenuButton={handleMenuButton}
      />
      {isLoggedIn ? <Component {...props} /> : <Redirect to="./" />}
      {path !== '/profile' && <Footer/>}
    </Route>
  );
};

export default ProtectedRoute;
