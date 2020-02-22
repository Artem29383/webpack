import { createStore, combineReducers } from 'redux';
import someReducer from '../models/test/reducer';


const reducer = combineReducers({
  myReducer: someReducer
});

const store = createStore(reducer);

export default store;