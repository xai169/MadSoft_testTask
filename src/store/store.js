import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import quizReducer from '../reducers/quizReducer';

const rootReducer = combineReducers({
  quiz: quizReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
