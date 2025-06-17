// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; 

import { productDetailsReducer } from "./Componets/Service/Reducer/productDetailsReducer";
import { productsReducer } from "./Componets/Service/Reducer/producstReducer";
import { profileReducer } from "./Componets/Service/Reducer/profileReducer";
import { userReducer } from "./Componets/Service/Reducer/userReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
