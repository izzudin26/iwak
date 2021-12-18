import {getCart} from '../webservice/buyer.service';

const GET_CART = 'GET_CART';
export default (cart = [], action) => {
  switch (action.type) {
    case 'SET_CART':
      return (cart = action.payload);

    case 'REMOVE_CART':
      cart.splice(action.payload, 1);
      return cart;

    case 'UPDATE_QTY':
      ++cart[action.payload].qty;
      return cart;

    default:
      return cart;
  }
};
