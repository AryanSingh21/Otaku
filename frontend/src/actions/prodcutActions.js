import * as constant from "../constants/productsConstants";
import axios from "axios";

export const getProducts =
  (currentPage = 1, keyword = "", category = "Foods") =>
  async (dispatch) => {
    try {
      dispatch({ type: constant.ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      let { data } = await axios.get(link);

      dispatch({
        type: constant.ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: constant.ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: constant.CLEAR_ERRORS,
  });
};

//prdouct details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: constant.PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: constant.PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: constant.PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//post new review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: constant.NEW_REVIEW_REQUEST });
    console.log(reviewData);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: constant.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: constant.NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//admin all products

export const getallAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: constant.ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: constant.ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: constant.ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create new product

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: constant.NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(productData);
    const { data } = await axios.post(
      "/api/v1/admin/products/new",

      productData,

      config
    );
    console.log("hey3");

    dispatch({
      type: constant.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: constant.NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: constant.DELETE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `/api/v1/admin/product/delete/${id}`,
      config
    );

    dispatch({
      type: constant.DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: constant.DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: constant.UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      updateData,
      config
    );

    dispatch({
      type: constant.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: constant.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: constant.ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: constant.ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: constant.ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReview = (productId, id) => async (dispatch) => {
  try {
    dispatch({ type: constant.DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?productId=${productId}&id=${id}`
    );

    dispatch({
      type: constant.DELETE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constant.DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
