import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { BrowserRouter } from "react-router-dom";
import "@ya.praktikum/react-developer-burger-ui-components";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);

