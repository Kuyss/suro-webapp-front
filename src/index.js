import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/es/integration/react'

const { persistor, store } = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
  			<App />
  		</PersistGate>
  	</Provider>, 
  	document.getElementById('root')
);
registerServiceWorker();
