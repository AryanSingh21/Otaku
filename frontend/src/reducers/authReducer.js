import * as userConstant from "../constants/userConstants";

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case userConstant.USER_REQUEST:
    case userConstant.REGISTER_USER_REQUEST:
    case userConstant.LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case userConstant.LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    }
    case userConstant.USER_SUCCESS:
    case userConstant.REGISTER_USER_SUCCESS:
    case userConstant.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case userConstant.LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case userConstant.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        // error: action.payload,
      };

    case userConstant.USER_FAIL:
    case userConstant.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case userConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUserReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case userConstant.ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.ALL_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        userSuccess: action.payload.success,
      };
    case userConstant.ALL_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        userSuccess: action.payload.success,
      };
    default:
      return {
        ...state,
      };
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstant.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.DELETE_USER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };
    case userConstant.DELETE_USER_RESET:
      return {
        isDeleted: false,
      };
    case userConstant.DELETE_USER_FAIL:
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
