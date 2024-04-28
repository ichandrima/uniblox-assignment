import axios from "axios";
import { PRODUCTS } from './constants';

//get products
export const getProducts = () => async dispatch => {
  await dispatch({ type: PRODUCTS.GET});
  try {
    const response = await axios.get("./db/products.json");
    return dispatch({type: PRODUCTS.GET, payload: response.data});
  } catch (err) {
    return dispatch({type: PRODUCTS.GET, payload: []});
  }
};