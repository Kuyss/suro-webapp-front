import { combineReducers } from 'redux';
import userReducer from './userReducer';

const appReducer = combineReducers({
	users: userReducer
});

const rootReducer = ( state, action ) => {
  if ( action.type === "LOGOUT" ) {
    state = undefined;
  }
      
  return appReducer(state, action)
}

export default rootReducer;