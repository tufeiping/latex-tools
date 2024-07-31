import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.LaTeXBuilder = function (id, setGetExpression) {
  ReactDOM.render(
    <React.StrictMode>
      <App setGetExpression={setGetExpression} />
    </React.StrictMode>,
    document.getElementById(id)
  );
}