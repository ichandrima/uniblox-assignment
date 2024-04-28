import axios from "axios";
import { DEALS } from './constants';

//get deals
export const getDeals = () => async dispatch => {
  await dispatch({ type: DEALS.GET});
  try {
    const response = await axios.get("./db/deals.json");
    return dispatch({type: DEALS.GET, payload: response.data});
  } catch (err) {
    return dispatch({type: DEALS.GET, payload: []});
  }
};