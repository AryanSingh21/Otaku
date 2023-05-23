import * as orderConstant from "../constants/orderConstant";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstant.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstant.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case orderConstant.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstant.MY_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstant.MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderConstant.MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export const OrdersDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstant.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstant.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case orderConstant.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstant.ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstant.ALL_ORDER_SUCCESS:
      return {
        loading: false,
        totalAmount: action.payload.totalAmount,
        orders: action.payload.orders,
      };
    case orderConstant.ALL_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstant.DELETE_ORDER_REQUEST:
    case orderConstant.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderConstant.DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };

    case orderConstant.UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
      };
    case orderConstant.DELETE_ORDER_FAIL: {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        error: action.payload,
      };
    }
    case orderConstant.UPDATE_ORDER_FAIL: {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        error: action.payload,
      };
    }
    case orderConstant.DELETE_ORDER_RESET: {
      return {
        ...state,
        isDeleted: false,
      };
    }
    case orderConstant.UPDATE_ORDER_RESET: {
      return {
        ...state,
        isUpdated: false,
      };
    }
    case orderConstant.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};
