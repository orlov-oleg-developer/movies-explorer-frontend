import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App/App";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { store } from "./store/index";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
