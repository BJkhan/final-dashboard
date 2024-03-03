import axios from "axios";
import {
  PRICE_EDIT_FAIL,
  PRICE_EDIT_REQUEST,
  PRICE_EDIT_SUCCESS,
  PRICE_LIST_FAIL,
  PRICE_LIST_REQUEST,
  PRICE_LIST_SUCCESS,
} from "../Constants/priceConstants";
import { toast } from "react-toastify";


// list taxes
export const listPrices = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRICE_LIST_REQUEST });

    const { data } = await axios.get(`api/api/price/settings`);

    dispatch({ type: PRICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRICE_LIST_FAIL,
      payload: message,
    });
  }
};

// EDIT PRICE
export const editPrices = (shipping, tax) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {
    dispatch({ type: PRICE_EDIT_REQUEST });
    const { data } = await axios.put(`api/api/price/settings`, shipping, tax);
    if (data) {
      toast.success('Taxes updated successfully', ToastObjects);
      dispatch({ type: PRICE_EDIT_SUCCESS, payload: data });
      dispatch({ type: PRICE_LIST_SUCCESS, payload: data });
    } else {
      toast.error('An unexpected error occured contact the administrator', ToastObjects);
    }
    
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRICE_EDIT_FAIL,
      payload: message,
    });
  }
};
