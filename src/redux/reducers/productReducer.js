import { PRODUCTS } from '../actions/constants';

const initState = {
  products: []
};

const productReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case PRODUCTS.GET:
      return {
        products: payload
      }
    default:
      return state;
  }
}

export default productReducer;