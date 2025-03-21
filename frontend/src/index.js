import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './tailwind.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./redux/store"



ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />

    </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
