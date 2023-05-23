import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductsReducer,
  deleteProductReducer,
  allReviewReducer,
  deleteReviewReducer,
} from "./reducers/productsReducer";
import {
  allUserReducer,
  deleteUserReducer,
  userReducer,
} from "./reducers/authReducer";
import { cartReducer } from "./reducers/cardReducer";
import {
  OrdersDetailsReducer,
  allOrdersReducer,
  myOrdersReducer,
  orderReducer,
  updateOrderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrdersReducer,
  orderDetails: OrdersDetailsReducer,
  newReview: newReviewReducer,
  createProduct: newProductsReducer,
  deleteProduct: deleteProductReducer,
  allOrders: allOrdersReducer,
  updateOrder: updateOrderReducer,
  allUsers: allUserReducer,
  deleteUser: deleteUserReducer,
  allReviews: allReviewReducer,
  deleteReview: deleteReviewReducer,
});

let initialState = {
  cart: {
    productState: localStorage.getItem("productState")
      ? JSON.parse(localStorage.getItem("productState"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
