import { CART } from '../actions/constants';

const initState = {
  cartItems: [],
  cartTotal: 0
};

const cartReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case CART.ADD:
      let isItemExists = state.cartItems.find(item => item.id === payload.id);
      let newCartTotal = state.cartTotal + payload.price;
      if (isItemExists) {
        payload.quantity += 1;
        return {
          ...state,
          cartTotal: newCartTotal
        }
      }
      else {
        payload.quantity = 1;
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
          cartTotal: newCartTotal
        }
      }
    case CART.REMOVE:
      let newItems = state.cartItems.filter(item => item.id !== payload.id);
      let newTotal = state.cartTotal - (payload.quantity * payload.price);
      return {
        ...state,
        cartItems: newItems,
        cartTotal: newTotal
      }
    case CART.EMPTY:
      return {
        ...state,
        cartItems: payload,
        cartTotal: 0
      }
    case CART.ADD_QUANTITY:
      let itemIndex = state.cartItems.findIndex(item => item.id === payload.id);
      let items = [...state.cartItems];
      items[itemIndex].quantity += 1;
      return {
        ...state,
        cartItems: items,
        cartTotal: state.cartTotal + payload.price
      }
    case CART.SUB_QUANTITY:
      let cartTotal = state.cartTotal - payload.price;
      if (payload.quantity === 1) {
        let newItems = state.cartItems.filter(item => item.id !== payload.id);
        return {
          ...state,
          cartItems: newItems,
          cartTotal: cartTotal
        }
      }
      else {
        let itemIndex = state.cartItems.findIndex(item => item.id === payload.id);
        let items = [...state.cartItems];
        items[itemIndex].quantity -= 1;
        return {
          ...state,
          cartItems: items,
          cartTotal: cartTotal
        }
      }
    default:
      return state;
  }
}

export default cartReducer;