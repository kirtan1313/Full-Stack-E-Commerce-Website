import { ADD_TO_CART } from '../ReducersName/cartReducerName'
import axios from 'axios'


export const addItemToCart = (id, quantity) => async (dispatch) => {


    const { data } = await axios.get(`http://localhost:3005/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            images: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cart-Product-Items',JSON.stringify(getState().cart.cartItmes))

}