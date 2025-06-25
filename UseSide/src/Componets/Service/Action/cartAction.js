import { ADD_TO_CART, REMOVE_CART, SAVE_SHIPING_INFO } from '../ReducersName/cartReducerName'
import axios from 'axios'


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`http://localhost:3005/api/v1/product/${id}`)

    const product = data.getSingleProduct;

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: product._id,
            name: product.name,
            price: product.price,
            images: product.images[0]?.url,
            stock: product.stock,
            quantity
        }
    });

    const { user } = getState().user;
    const key = user && user._id ? `cart-Product-Items-${user._id}` : 'cart-Product-Items';
    localStorage.setItem(key, JSON.stringify(getState().cartProducts.cartItems));

}

export const removeItemsCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART,
        payload: id
    })
    const { user } = getState().user;
  const key = user && user._id ? `cart-Product-Items-${user._id}` : 'cart-Product-Items';
    localStorage.setItem(key, JSON.stringify(getState().cartProducts.cartItems));
}

export const saveShipingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPING_INFO,
        payload: data
    })
    localStorage.setItem('shiping-info', JSON.stringify(data));
}


export const loadCartFromStorage = () => (dispatch, getState) => {
  const { user } = getState().user;
  const key = user && user._id ? `cart-Product-Items-${user._id}` : 'cart-Product-Items';
  const localCart = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

  dispatch({
    type: "LOAD_CART_FROM_STORAGE",
    payload: localCart
  });
};