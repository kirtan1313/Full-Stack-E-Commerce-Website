import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCES,
    ALL_PRODUCTS_FAIL,
} from "../ReducersName/ProductsReducersName";

const initialState = {
    products: [],
    loading: false,
    error: null,
    productCount: 0,
    resultPerPage: 0,
    filteredProductCount: 0,
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            };

        case ALL_PRODUCTS_SUCCES:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                ProductCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductCount: action.payload.filteredProductCount,
                category:action.payload.category
            };

        case ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
