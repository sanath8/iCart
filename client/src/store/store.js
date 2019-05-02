import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

export var store = createStore(rootReducer, applyMiddleware(thunk));