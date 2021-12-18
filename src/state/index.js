import {combineReducers} from 'redux';
import chat from './chat';
import cart from './cart';

export default combineReducers({
  chat: chat,
  cart: cart,
});
