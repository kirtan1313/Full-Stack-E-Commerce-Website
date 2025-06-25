import {
    PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCES, PRODUCTS_DETAILS_FAIL, CLEAR_ERROR,
    PRODUCTS_REVIEW_FAIL, PRODUCTS_REVIEW_SUCCES, PRODUCTS_REVIEW_REQUEST
} from '../ReducersName/ProductsReducersName'


const initialState = {
    product: {},
    loading: false,
    error: null
};

export const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PRODUCTS_DETAILS_SUCCES:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCTS_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};


export const productReview = (state = {}, action) => {
    switch (action.type) {
        case PRODUCTS_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PRODUCTS_REVIEW_SUCCES:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCTS_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
     
        default:
            return state;
    }
};