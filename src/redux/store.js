import { thunk } from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import dealReducer from './reducers/dealReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import couponReducer from './reducers/couponReducer';

const allReducers = combineReducers({
  dealReducer: dealReducer,
  productReducer: productReducer,
  cartReducer: cartReducer,
  couponReducer: couponReducer
});

export const store = createStore(allReducers, applyMiddleware(thunk));