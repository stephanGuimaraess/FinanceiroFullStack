import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

let persistor = persistStore(store);

window.jQuery = $;
window.$ = $;
window.Popper = Popper;
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  
<React.StrictMode>    
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
</React.StrictMode>,

);
  