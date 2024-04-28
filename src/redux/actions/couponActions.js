import axios from "axios";
import { COUPONS } from './constants';

//get coupons
export const getCoupons = () => async dispatch => {
  await dispatch({ type: COUPONS.GET});
  try {
    const response = await axios.get("./db/coupons.json");
    return dispatch({type: COUPONS.GET, payload: response.data});
  } catch (err) {
    return dispatch({type: COUPONS.GET, payload: []});
  }
};

//apply coupon
export const applyCoupon = (item) => {
  return {
    type: COUPONS.APPLY,
    payload: item
  }
}

//applied coupon count
export const appliedCount = () => {
  return {
    type: COUPONS.APPLIED_COUNT,
    payload: null
  }
}