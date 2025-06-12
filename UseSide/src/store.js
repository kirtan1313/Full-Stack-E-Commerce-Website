import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer } from "./Componets/Service/Reducer/productDetailsReducer";
import { productReducer } from "./Componets/Service/Reducer/producstReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer
})

let intialstate = {}
const middleware = [thunk]

const store = createStore(
    reducer,
    intialstate,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
