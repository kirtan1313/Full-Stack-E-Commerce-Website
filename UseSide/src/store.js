// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productDetailsReducer } from "./Componets/Service/Reducer/productDetailsReducer";
import { productsReducer } from "./Componets/Service/Reducer/producstReducer";
import { profileReducer } from "./Componets/Service/Reducer/profileReducer";
import { userReducer } from "./Componets/Service/Reducer/userReducer";
import { forgetPasswordReducer } from "./Componets/Service/Reducer/forgetPasswordReducer";
import { cartReducer } from "./Componets/Service/Reducer/cartReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cartProducts: cartReducer
});

const initialState = {
  cartProducts: {
    cartItems: localStorage.getItem('cart-Product-Items')
      ? JSON.parse(localStorage.getItem('cart-Product-Items'))
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
