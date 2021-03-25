import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'

ReactDOM.render(
  <firebaseContext.Provider value={{ firebase, FieldValue }}>
    <App /> 
  </firebaseContext.Provider>,
  document.getElementById('root')
);


