import { CART } from './constants';

//add cart
export const addToCart = (item) => {
  return {
    type: CART.ADD,
    payload: item
  }
}

//remove item
export const removeFromCart = (item) => {
  return {
    type: CART.REMOVE,
    payload: item
  }
}

//empty cart
export const emptyCart = () => {
  return {
    type: CART.EMPTY,
    payload: []
  }
}

//add quantity
export const addQuantity = (item) => {
  return {
    type: CART.ADD_QUANTITY,
    payload: item
  }
}

//subtract quantity
export const subtractQuantity = (item) => {
  return {
    type: CART.SUB_QUANTITY,
    payload: item
  }
}