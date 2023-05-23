import axios from "axios";
import * as userConstant from "../constants/userConstants";

//login

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstant.USER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const { data } = await axios.post(
      "api/v1/login",
      { email, password },
      config
    );

    dispatch({
      type: userConstant.USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userConstant.USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//register
// Register user
export const register = (email, name, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstant.REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(email);
    const { data } = await axios.post(
      "/api/v1/register",
      { email, name, password },
      config
    );

    dispatch({
      type: userConstant.REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userConstant.REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: userConstant.LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: userConstant.LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userConstant.LOAD_USER_FAIL,
      payload: error.message,
    });
  }
};

//logout user

export const logoutUser = () => async (dispatch) => {
  try {
    axios.get("/api/v1/logout");

    dispatch({
      type: userConstant.LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: userConstant.LOGOUT_FAIL,
      payload: error.message,
    });
  }
};

export const loadAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: userConstant.ALL_USER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/users");

    dispatch({
      type: userConstant.ALL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstant.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstant.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: userConstant.DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstant.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
