import axios from "axios";
import * as cartConstant from "../constants/cartConstants";

export const cartAdd = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: cartConstant.CART_ADD_STARTED });

    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: cartConstant.CART_ADD_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: cartConstant.CART_ADD_FAIL,
      payload: error.response.data.message,
    });
  }
  localStorage.setItem(
    "productState",
    JSON.stringify(getState().cart.productState)
  );
};

export const removeProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: cartConstant.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem(
    "productState",
    JSON.stringify(getState().cart.productState)
  );
};
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: cartConstant.SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
