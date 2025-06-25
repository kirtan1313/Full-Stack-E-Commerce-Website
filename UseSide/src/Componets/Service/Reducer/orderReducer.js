import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCES,
    MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCES,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCES,
    ORDER_DETAILS_FAIL
} from "../ReducersName/orderReducerName";



export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCES:
            return {
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: true,
                error: action.payload
            }


        default:
            return state;
    }
}




const initialState = {
    orders: [],
    loading: false,
    error: null,
};
export const myOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                loading: true
            }

        case MY_ORDER_SUCCES:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}




export const OrderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCES:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}