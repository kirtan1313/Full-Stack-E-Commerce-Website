import {
    FORGET_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCES,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCES
} from '../ReducersName/userReducerName'

const initialState = {
    loading: false,
    error: null
};

export const forgetPasswordReducer = (state = initialState, action) => {

    switch (action.type) {
        case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FORGET_PASSWORD_SUCCES:

            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case RESET_PASSWORD_SUCCES:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}