import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.LaTeXBuilder = function (id) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(id)
  );
}