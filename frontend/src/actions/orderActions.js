import axios from "axios";
import * as orderConstant from "../constants/orderConstant";

export const newOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstant.CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    console.log("hey");
    console.log(data);

    dispatch({
      type: orderConstant.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstant.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOrder = () => async (dispatch) => {
  try {
    dispatch({ type: orderConstant.MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({
      type: orderConstant.MY_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: orderConstant.MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderDeatils = (id) => async (dispatch) => {
  try {
    dispatch({ type: orderConstant.ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: orderConstant.ORDER_DETAILS_SUCCESS,

      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: orderConstant.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: orderConstant.ALL_ORDER_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/allOrders`);

    dispatch({
      type: orderConstant.ALL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstant.ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: orderConstant.UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      { status },
      config
    );

    dispatch({
      type: orderConstant.UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstant.UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: orderConstant.DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: orderConstant.DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstant.DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
