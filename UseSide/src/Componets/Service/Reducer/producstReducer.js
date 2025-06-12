import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCES, CLEAR_ERROR } from '../ReducersName/ProductsReducersName'



const intialReduce = {
    products: []
}

export const productReducer = (state = intialReduce, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            };

        case ALL_PRODUCTS_SUCCES:
            return {
                loading: false,
                products: action.payload.ProductGet,
                ProductCount: action.payload.ProductCount,
                resultPerPage:action.payload.resultPerPage
            };

        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}