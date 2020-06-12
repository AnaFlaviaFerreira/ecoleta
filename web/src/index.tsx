import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Mpstrar em tela o app dentro da minha id root que está no index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);