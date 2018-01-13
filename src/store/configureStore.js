import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

const config = {
  key: 'root',
  storage,
};

const reducer = persistReducer(config, rootReducer);

export default function configureStore(initialState) {
	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(
				thunkMiddleware
			),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	const persistor = persistStore(store);

	if(module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default;
			store.replaceReducer(nextReducer);
		});
	}

	return { persistor, store };
}