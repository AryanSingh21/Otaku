import * as cartConstant from "../constants/cartConstants";
var mainArray = [];
export const cartReducer = (
  state = { productState: {}, shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case cartConstant.CART_ADD_STARTED:
      return {
        loading: true,
        productState: [],
      };
    case cartConstant.CART_ADD_SUCCESS:
      let item = action.payload;
      mainArray.push(item);

      // const isItemExist = state.productState.find((i) => i._id === item._id);
      // if (isItemExist) {
      //   return {
      //     ...state,
      //     productState: state.productState.map((i) =>
      //       i.product === isItemExist.product ? item : i.product
      //     ),
      //   };
      // } else {
      // state.productState = this.productState.push(item);

      return {
        ...state,
        productState: mainArray,
      };

    case cartConstant.CART_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case cartConstant.REMOVE_FROM_CART:
      mainArray = mainArray.filter((i) => i._id !== action.payload);
      return {
        ...state,
        productState: state.productState.filter(
          (i) => i._id !== action.payload
        ),
      };
    case cartConstant.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
