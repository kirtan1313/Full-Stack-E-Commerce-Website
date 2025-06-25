// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productDetailsReducer, productReview } from "./Componets/Service/Reducer/productDetailsReducer";
import { productsReducer } from "./Componets/Service/Reducer/producstReducer";
import { profileReducer } from "./Componets/Service/Reducer/profileReducer";
import { userReducer } from "./Componets/Service/Reducer/userReducer";
import { forgetPasswordReducer } from "./Componets/Service/Reducer/forgetPasswordReducer";
import { cartReducer } from "./Componets/Service/Reducer/cartReducer";
import { myOrderReducer, newOrderReducer, OrderDetailsReducer } from "./Componets/Service/Reducer/orderReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cartProducts: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: OrderDetailsReducer,
  reviews: productReview
});

const userInfo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const cartKey = userInfo?._id ? `cart-Product-Items-${userInfo._id}` : "cart-Product-Items";

const initialState = {
  user: {
    user: userInfo,
  },
  cartProducts: {
    cartItems: localStorage.getItem(cartKey)
      ? JSON.parse(localStorage.getItem(cartKey))
      : [],
    shipingInfo: localStorage.getItem('shiping-info')
      ? JSON.parse(localStorage.getItem('shiping-info'))
      : {}
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
