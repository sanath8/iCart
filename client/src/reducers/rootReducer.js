import {combineReducers} from 'redux';
import {products} from './products';
import {cart} from './cart';
import {login} from './login'
import {path} from './path';
import {recommends} from './recommends';

export var rootReducer = combineReducers({products,cart,login,path,recommends});