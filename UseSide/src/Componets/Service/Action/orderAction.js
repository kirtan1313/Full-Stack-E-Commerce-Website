import axios from "axios";
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCES,
    MY_ORDER_FAIL, 
    MY_ORDER_REQUEST, 
    MY_ORDER_SUCCES,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCES,
    ORDER_DETAILS_FAIL
} from "../ReducersName/orderReducerName";

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };


        const { data } = await axios.post(`http://localhost:3005/api/v1/new/order`, order, config)

        dispatch({ type: CREATE_ORDER_SUCCES, payload: data })

    } catch (error) {

        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}




export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDER_REQUEST })
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const { data } = await axios.get(`http://localhost:3005/api/v1/me/order`, config)

        dispatch({ type: MY_ORDER_SUCCES, payload: data.orders })

    } catch (error) {

        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const OrdersDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST})
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const { data } = await axios.get(`http://localhost:3005/api/v1/order/${id}`, config)

        dispatch({ type: ORDER_DETAILS_SUCCES, payload: data.order })

    } catch (error) {

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
