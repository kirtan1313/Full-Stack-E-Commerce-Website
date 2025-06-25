import {
    ADD_TO_CART,
    REMOVE_CART,
    SAVE_SHIPING_INFO
} from '../ReducersName/cartReducerName'

const initialState = {
    cartItems: [],
    loading: false,
    error: null
};

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExit = state.cartItems.find((i) =>
                i.product === item.product
            )

            if (isItemExit) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((data) =>
                        data.product === isItemExit.product ? item : data
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }


        case REMOVE_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((data) => data.product !== action.payload)
            }

        case SAVE_SHIPING_INFO:
            return {
                ...state,
                shipingInfo: action.payload
            }

        case "LOAD_CART_FROM_STORAGE":
            return {
                ...state,
                cartItems: action.payload
            };
        default:
            return state
    }

}