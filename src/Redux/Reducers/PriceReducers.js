// GET PRICES
import {
  PRICE_EDIT_FAIL,
  PRICE_EDIT_REQUEST,
    PRICE_EDIT_SUCCESS,
    PRICE_LIST_FAIL,
    PRICE_LIST_REQUEST,
    PRICE_LIST_SUCCESS,
  } from "../Constants/priceConstants";
  export const priceReducers = (state = { price: {} }, action) => {
    switch (action.type) {
      case PRICE_LIST_REQUEST:
        return { ...state, loading: true };
      case PRICE_LIST_SUCCESS:
        return { loading: false, price: action.payload };
      case PRICE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // EDIT PRICE
export const priceEditReducer = (
  state = { price: {} },
  action
) => {
  switch (action.type) {
    case PRICE_EDIT_REQUEST:
      return { ...state, loading: true };
    case PRICE_EDIT_SUCCESS:
      return { loading: false, price: action.payload };
    case PRICE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};