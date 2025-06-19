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

    localStorage.setItem('cart-Product-Items', JSON.stringify(getState().cartProducts.cartItems));

}

export const removeItemsCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART,
        payload: id
    })
    localStorage.setItem('cart-Product-Items', JSON.stringify(getState().cartProducts.cartItems));
}

export const saveShipingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPING_INFO,
        payload: data
    })
    localStorage.setItem('shiping-info', JSON.stringify(data));
}