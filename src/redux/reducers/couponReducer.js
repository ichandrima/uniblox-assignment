import { COUPONS } from '../actions/constants';

const initState = {
  coupons: [],
  appliedCoupon: null,
  appliedCouponCount: 0
};

const couponReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case COUPONS.GET:
      return {
        ...state,
        coupons: payload
      }
    case COUPONS.APPLY:
      return {
        ...state,
        appliedCoupon: payload
      }
    case COUPONS.APPLIED_COUNT:
      return {
        ...state,
        appliedCouponCount: state.appliedCouponCount + 1
      }
    default:
      return state;
  }
}

export default couponReducer;