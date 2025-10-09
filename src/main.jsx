import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


const isLocalhost = window.location.hostname === "localhost";

const baseURL = isLocalhost
  ? "http://localhost:5000/api"
  : "https://your-domain.com/api"; // Replace with your production URL or droplet IP

axios.defaults.baseURL = baseURL;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App baseURL={baseURL} />
    </BrowserRouter>
  </Provider>
)
