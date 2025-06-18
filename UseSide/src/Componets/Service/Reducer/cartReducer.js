import { ADD_TO_CART } from '../ReducersName/cartReducerName'

const initialState = {
    cartItmes: [],
    loading: false,
    error: null
};

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExit = state.cartItmes.find((i) =>
                i.product === item.product
            )

            if (isItemExit) {
                return {
                    ...state,
                    cartItmes: state.cartItmes.map((data) =>
                        data.product === isItemExit.product ? item : data
                    )
                }
            } else {
                return {
                    ...state,
                    cartItmes: [...state.cartItmes, item]
                }
            }

        default:
           return state
    }

}