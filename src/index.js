import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './styles/app.css'

ReactDOM.render(
  <firebaseContext.Provider value={{ firebase, FieldValue }}>
    <App /> 
  </firebaseContext.Provider>,
  document.getElementById('root')
);


