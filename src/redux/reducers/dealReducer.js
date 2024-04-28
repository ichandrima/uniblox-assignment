import { DEALS } from '../actions/constants';

const initState = {
  deals: []
};

const dealReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case DEALS.GET:
      return {
        deals: payload
      }
    default:
      return state;
  }
}

export default dealReducer;