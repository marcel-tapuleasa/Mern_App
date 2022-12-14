import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './context/UserContext';
import { ThemeProvider } from '@mui/styles';

import { ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <ToastContainer transition={Zoom} position='top-center' hideProgressBar='true' autoClose={3000} pauseOnFocusLoss={false}/>
    </UserProvider>
  </BrowserRouter>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
