import * as constants from "../constants/productsConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case constants.ALL_PRODUCTS_REQUEST:
    case constants.ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case constants.ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
      };
    case constants.ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case constants.ALL_PRODUCTS_FAIL:
    case constants.ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.DELETE_PRODUCT_REQUEST:
    case constants.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };

    case constants.UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
      };
    case constants.DELETE_PRODUCT_FAIL: {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };
    }
    case constants.UPDATE_PRODUCT_FAIL: {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    }
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case constants.PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case constants.PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case constants.NEW_REVIEW_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export const newProductsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case constants.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case constants.NEW_PRODUCT_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export const allReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case constants.ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case constants.ALL_REVIEW_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };
    case constants.DELETE_REVIEW_FAIL: {
      return {
        ...state,
        error: action.payload,
        isDeleted: action.payload.success,
      };
    }
    case constants.DELETE_REVIEW_RESET: {
      return {
        loading: false,
        isDeleted: false,
      };
    }
    case constants.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};
