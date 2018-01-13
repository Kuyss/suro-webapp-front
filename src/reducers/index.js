import { combineReducers } from 'redux';
import userReducer from './userReducer';
import reservationReducer from './reservationReducer';
import itemReducer from './itemReducer';

const appReducer = combineReducers({
  users: userReducer,
  reservations: reservationReducer,
  items: itemReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action)
}

export default rootReducer;