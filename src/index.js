import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.LaTeXBuilder = function (id, setGetExpression) {
  // 动态注入 KaTeX CSS
  if (!document.getElementById('katex-css')) {
    const link = document.createElement('link');
    link.id = 'katex-css';
    link.rel = 'stylesheet';
    link.href = '/katex-dist/katex.min.css';
    document.head.appendChild(link);
  }

  ReactDOM.render(
    <React.StrictMode>
      <App setGetExpression={setGetExpression} />
    </React.StrictMode>,
    document.getElementById(id)
  );
}